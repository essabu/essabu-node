import { describe, it, expect } from 'vitest';
import crypto from 'node:crypto';

/**
 * Webhook signature verification tests.
 *
 * These test the webhook verification logic that would be included
 * in a utility module or used directly in webhook handlers.
 */

interface WebhookEvent {
  id: string;
  type: string;
  createdAt: string;
  data: Record<string, unknown>;
}

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex'),
    );
  } catch {
    return false;
  }
}

function constructEvent(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string,
  toleranceMs: number = 5 * 60 * 1000,
): WebhookEvent {
  const parts = signatureHeader.split(',');
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signaturePart = parts.find((p) => p.startsWith('v1='));

  if (!timestampPart || !signaturePart) {
    throw new Error('Invalid webhook signature header format');
  }

  const timestamp = timestampPart.slice(2);
  const signature = signaturePart.slice(3);

  const eventAge = Date.now() - parseInt(timestamp, 10) * 1000;
  if (eventAge > toleranceMs) {
    throw new Error('Webhook event is too old. Possible replay attack.');
  }

  const signedPayload = `${timestamp}.${rawBody}`;

  if (!verifyWebhookSignature(signedPayload, signature, webhookSecret)) {
    throw new Error('Webhook signature verification failed');
  }

  return JSON.parse(rawBody) as WebhookEvent;
}

function createSignature(payload: string, secret: string): { header: string; timestamp: string } {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  return {
    header: `t=${timestamp},v1=${signature}`,
    timestamp,
  };
}

describe('Webhook signature verification', () => {
  const SECRET = 'whsec_test_secret_key_123';

  it('should verify a valid signature', () => {
    const payload = '{"test": true}';
    const signedPayload = `12345.${payload}`;

    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(signedPayload, 'utf8')
      .digest('hex');

    expect(verifyWebhookSignature(signedPayload, signature, SECRET)).toBe(true);
  });

  it('should reject an invalid signature', () => {
    const payload = 'test payload';
    const invalidSignature = 'a'.repeat(64);

    expect(verifyWebhookSignature(payload, invalidSignature, SECRET)).toBe(false);
  });

  it('should reject a malformed signature (wrong length)', () => {
    expect(verifyWebhookSignature('payload', 'not-hex', SECRET)).toBe(false);
  });

  it('should reject a modified payload', () => {
    const original = '{"amount": 100}';
    const signedPayload = `12345.${original}`;

    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(signedPayload, 'utf8')
      .digest('hex');

    const tampered = `12345.{"amount": 999}`;
    expect(verifyWebhookSignature(tampered, signature, SECRET)).toBe(false);
  });
});

describe('constructEvent', () => {
  const SECRET = 'whsec_test_secret_key_123';

  it('should construct event from valid request', () => {
    const payload = JSON.stringify({
      id: 'evt_123',
      type: 'payment_intent.succeeded',
      createdAt: new Date().toISOString(),
      data: { amount: 5000 },
    });

    const { header } = createSignature(payload, SECRET);

    const event = constructEvent(payload, header, SECRET);

    expect(event.id).toBe('evt_123');
    expect(event.type).toBe('payment_intent.succeeded');
    expect(event.data['amount']).toBe(5000);
  });

  it('should reject invalid signature header format', () => {
    expect(() =>
      constructEvent('{}', 'invalid-header', SECRET),
    ).toThrow('Invalid webhook signature header format');
  });

  it('should reject missing timestamp', () => {
    expect(() =>
      constructEvent('{}', 'v1=abc123', SECRET),
    ).toThrow('Invalid webhook signature header format');
  });

  it('should reject missing signature', () => {
    expect(() =>
      constructEvent('{}', 't=12345', SECRET),
    ).toThrow('Invalid webhook signature header format');
  });

  it('should reject old events (replay attack protection)', () => {
    const payload = JSON.stringify({
      id: 'evt_old',
      type: 'test',
      createdAt: new Date().toISOString(),
      data: {},
    });

    // Create a signature with a very old timestamp
    const oldTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
    const signedPayload = `${oldTimestamp}.${payload}`;
    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(signedPayload, 'utf8')
      .digest('hex');

    const header = `t=${oldTimestamp},v1=${signature}`;

    expect(() => constructEvent(payload, header, SECRET)).toThrow(
      'Webhook event is too old',
    );
  });

  it('should reject tampered payload', () => {
    const original = JSON.stringify({
      id: 'evt_123',
      type: 'payment_intent.succeeded',
      createdAt: new Date().toISOString(),
      data: { amount: 100 },
    });

    const { header } = createSignature(original, SECRET);

    const tampered = JSON.stringify({
      id: 'evt_123',
      type: 'payment_intent.succeeded',
      createdAt: new Date().toISOString(),
      data: { amount: 999999 },
    });

    expect(() => constructEvent(tampered, header, SECRET)).toThrow(
      'Webhook signature verification failed',
    );
  });

  it('should reject wrong secret', () => {
    const payload = JSON.stringify({
      id: 'evt_123',
      type: 'test',
      createdAt: new Date().toISOString(),
      data: {},
    });

    const { header } = createSignature(payload, SECRET);

    expect(() => constructEvent(payload, header, 'wrong_secret')).toThrow(
      'Webhook signature verification failed',
    );
  });

  it('should handle various event types', () => {
    const eventTypes = [
      'payment_intent.succeeded',
      'payment_intent.failed',
      'invoice.finalized',
      'invoice.paid',
      'employee.created',
      'employee.terminated',
      'subscription.renewed',
      'einvoice.submission.accepted',
    ];

    for (const eventType of eventTypes) {
      const payload = JSON.stringify({
        id: `evt_${eventType}`,
        type: eventType,
        createdAt: new Date().toISOString(),
        data: { eventType },
      });

      const { header } = createSignature(payload, SECRET);
      const event = constructEvent(payload, header, SECRET);

      expect(event.type).toBe(eventType);
    }
  });
});
