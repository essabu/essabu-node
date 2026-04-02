/**
 * Example: Handle webhooks from the Essabu platform.
 *
 * This demonstrates how to set up webhook endpoints with Express
 * to receive real-time notifications for events like payment completions,
 * invoice updates, and employee changes.
 *
 * Similar to Stripe's webhook handling pattern.
 *
 * Run: npx tsx examples/webhook-handler.ts
 *
 * Prerequisites:
 *   npm install express @types/express
 */

import crypto from 'node:crypto';

// -------------------------------------------------------------------
// Webhook signature verification utility
// -------------------------------------------------------------------

interface WebhookEvent {
  id: string;
  type: string;
  createdAt: string;
  data: Record<string, unknown>;
}

/**
 * Verify that a webhook payload was signed by Essabu.
 * This prevents spoofed requests from unauthorized sources.
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex'),
  );
}

/**
 * Parse and verify a webhook event from the raw request body.
 */
function constructEvent(
  rawBody: string,
  signatureHeader: string,
  webhookSecret: string,
): WebhookEvent {
  // The signature header format: t=<timestamp>,v1=<signature>
  const parts = signatureHeader.split(',');
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signaturePart = parts.find((p) => p.startsWith('v1='));

  if (!timestampPart || !signaturePart) {
    throw new Error('Invalid webhook signature header format');
  }

  const timestamp = timestampPart.slice(2);
  const signature = signaturePart.slice(3);

  // Protect against replay attacks: reject events older than 5 minutes
  const eventAge = Date.now() - parseInt(timestamp, 10) * 1000;
  if (eventAge > 5 * 60 * 1000) {
    throw new Error('Webhook event is too old. Possible replay attack.');
  }

  // Build the signed payload: timestamp + '.' + rawBody
  const signedPayload = `${timestamp}.${rawBody}`;

  if (!verifyWebhookSignature(signedPayload, signature, webhookSecret)) {
    throw new Error('Webhook signature verification failed');
  }

  return JSON.parse(rawBody) as WebhookEvent;
}

// -------------------------------------------------------------------
// Express webhook endpoint
// -------------------------------------------------------------------

async function main() {
  // In a real app, use: import express from 'express';
  // Here we show the handler logic for reference.

  const WEBHOOK_SECRET = process.env['ESSABU_WEBHOOK_SECRET'] ?? 'whsec_test_...';

  /**
   * This function would be your Express route handler:
   *
   *   app.post('/webhooks/essabu', express.raw({ type: 'application/json' }), handleWebhook);
   *
   * IMPORTANT: You must use express.raw() to get the raw body for signature verification.
   * Do NOT use express.json() on webhook routes.
   */
  function handleWebhook(rawBody: string, signatureHeader: string): void {
    let event: WebhookEvent;

    // 1. Verify the webhook signature
    try {
      event = constructEvent(rawBody, signatureHeader, WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      // Return 400 to Essabu so it retries later
      return;
    }

    console.log(`Received event: ${event.type} (${event.id})`);

    // 2. Handle different event types
    switch (event.type) {
      // -- Payment events --
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data;
        console.log(`Payment succeeded: ${paymentIntent['id']}`);
        console.log(`Amount: ${paymentIntent['amount']} ${paymentIntent['currency']}`);
        // Fulfill the order, send confirmation email, etc.
        break;
      }

      case 'payment_intent.failed': {
        const paymentIntent = event.data;
        console.log(`Payment failed: ${paymentIntent['id']}`);
        console.log(`Reason: ${paymentIntent['failureReason']}`);
        // Notify the customer, retry logic, etc.
        break;
      }

      // -- Invoice events --
      case 'invoice.finalized': {
        const invoice = event.data;
        console.log(`Invoice finalized: ${invoice['invoiceNumber']}`);
        // Send the invoice to the customer
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data;
        console.log(`Invoice paid: ${invoice['invoiceNumber']}`);
        // Update internal records
        break;
      }

      // -- HR events --
      case 'employee.created': {
        const employee = event.data;
        console.log(`New employee: ${employee['firstName']} ${employee['lastName']}`);
        // Trigger onboarding workflow
        break;
      }

      case 'employee.terminated': {
        const employee = event.data;
        console.log(`Employee terminated: ${employee['id']}`);
        // Trigger offboarding, revoke access, etc.
        break;
      }

      // -- Subscription events --
      case 'subscription.renewed': {
        const subscription = event.data;
        console.log(`Subscription renewed: ${subscription['id']}`);
        break;
      }

      case 'subscription.cancelled': {
        const subscription = event.data;
        console.log(`Subscription cancelled: ${subscription['id']}`);
        // Handle downgrade logic
        break;
      }

      // -- E-Invoice events --
      case 'einvoice.submission.accepted': {
        const submission = event.data;
        console.log(`E-Invoice accepted: ${submission['invoiceId']}`);
        break;
      }

      case 'einvoice.submission.rejected': {
        const submission = event.data;
        console.log(`E-Invoice rejected: ${submission['invoiceId']}`);
        console.log(`Errors: ${JSON.stringify(submission['errors'])}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // 3. Return 200 to acknowledge receipt
    console.log('Webhook processed successfully');
  }

  // -------------------------------------------------------------------
  // Simulate receiving a webhook (for demo purposes)
  // -------------------------------------------------------------------

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = JSON.stringify({
    id: 'evt_test_123',
    type: 'payment_intent.succeeded',
    createdAt: new Date().toISOString(),
    data: {
      id: 'pi_abc123',
      amount: 15000,
      currency: 'USD',
      status: 'succeeded',
    },
  });

  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signedPayload, 'utf8')
    .digest('hex');

  const signatureHeader = `t=${timestamp},v1=${signature}`;

  console.log('Simulating webhook reception...\n');
  handleWebhook(payload, signatureHeader);
}

main();
