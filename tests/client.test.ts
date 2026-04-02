import { describe, it, expect } from 'vitest';
import { Essabu } from '../src/client';
import { HrClient } from '../src/hr/client';
import { AccountingClient } from '../src/accounting/client';
import { IdentityClient } from '../src/identity/client';
import { TradeClient } from '../src/trade/client';
import { PaymentClient } from '../src/payment/client';
import { EInvoiceClient } from '../src/einvoice/client';
import { ProjectClient } from '../src/project/client';
import { AssetClient } from '../src/asset/client';

describe('Essabu Client', () => {
  const config = {
    apiKey: 'test-api-key',
    tenantId: 'test-tenant-id',
  };

  it('should create a client with valid config', () => {
    const client = new Essabu(config);
    expect(client).toBeInstanceOf(Essabu);
  });

  it('should throw if apiKey is missing', () => {
    expect(() => new Essabu({ apiKey: '', tenantId: 'test' })).toThrow('apiKey is required');
  });

  it('should throw if tenantId is missing', () => {
    expect(() => new Essabu({ apiKey: 'test', tenantId: '' })).toThrow('tenantId is required');
  });

  describe('Module accessors', () => {
    const client = new Essabu(config);

    it('should return HrClient', () => {
      expect(client.hr).toBeInstanceOf(HrClient);
    });

    it('should return AccountingClient', () => {
      expect(client.accounting).toBeInstanceOf(AccountingClient);
    });

    it('should return IdentityClient', () => {
      expect(client.identity).toBeInstanceOf(IdentityClient);
    });

    it('should return TradeClient', () => {
      expect(client.trade).toBeInstanceOf(TradeClient);
    });

    it('should return PaymentClient', () => {
      expect(client.payment).toBeInstanceOf(PaymentClient);
    });

    it('should return EInvoiceClient', () => {
      expect(client.einvoice).toBeInstanceOf(EInvoiceClient);
    });

    it('should return ProjectClient', () => {
      expect(client.project).toBeInstanceOf(ProjectClient);
    });

    it('should return AssetClient', () => {
      expect(client.asset).toBeInstanceOf(AssetClient);
    });

    it('should return the same instance on repeated access (lazy singleton)', () => {
      expect(client.hr).toBe(client.hr);
      expect(client.accounting).toBe(client.accounting);
      expect(client.trade).toBe(client.trade);
    });
  });
});
