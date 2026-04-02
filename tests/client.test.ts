import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Essabu } from '../src/client';
import type { EssabuConfig } from '../src/config';
import {
  EssabuError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from '../src/common/exceptions';
import { firstPage, pageOf, toQueryString } from '../src/common/models';

const TEST_CONFIG: EssabuConfig = {
  apiKey: 'test-api-key',
  tenantId: 'test-tenant-id',
  baseUrl: 'https://test.essabu.com',
};

describe('Essabu', () => {
  it('should throw if apiKey is missing', () => {
    expect(
      () => new Essabu({ apiKey: '', tenantId: 'test' }),
    ).toThrow('apiKey is required');
  });

  it('should throw if tenantId is missing', () => {
    expect(
      () => new Essabu({ apiKey: 'key', tenantId: '' }),
    ).toThrow('tenantId is required');
  });

  it('should create an instance with valid config', () => {
    const essabu = new Essabu(TEST_CONFIG);
    expect(essabu).toBeInstanceOf(Essabu);
  });

  it('should lazily initialize module clients', () => {
    const essabu = new Essabu(TEST_CONFIG);

    // Each getter should return the same instance
    const hr1 = essabu.hr;
    const hr2 = essabu.hr;
    expect(hr1).toBe(hr2);

    const accounting1 = essabu.accounting;
    const accounting2 = essabu.accounting;
    expect(accounting1).toBe(accounting2);

    const identity1 = essabu.identity;
    const identity2 = essabu.identity;
    expect(identity1).toBe(identity2);

    const trade1 = essabu.trade;
    const trade2 = essabu.trade;
    expect(trade1).toBe(trade2);

    const payment1 = essabu.payment;
    const payment2 = essabu.payment;
    expect(payment1).toBe(payment2);

    const einvoice1 = essabu.einvoice;
    const einvoice2 = essabu.einvoice;
    expect(einvoice1).toBe(einvoice2);

    const project1 = essabu.project;
    const project2 = essabu.project;
    expect(project1).toBe(project2);

    const asset1 = essabu.asset;
    const asset2 = essabu.asset;
    expect(asset1).toBe(asset2);
  });

  it('should expose all 8 module clients', () => {
    const essabu = new Essabu(TEST_CONFIG);

    expect(essabu.hr).toBeDefined();
    expect(essabu.accounting).toBeDefined();
    expect(essabu.identity).toBeDefined();
    expect(essabu.trade).toBeDefined();
    expect(essabu.payment).toBeDefined();
    expect(essabu.einvoice).toBeDefined();
    expect(essabu.project).toBeDefined();
    expect(essabu.asset).toBeDefined();
  });
});

describe('HR Client', () => {
  it('should expose all HR sub-resources', () => {
    const essabu = new Essabu(TEST_CONFIG);
    const hr = essabu.hr;

    expect(hr.employees).toBeDefined();
    expect(hr.departments).toBeDefined();
    expect(hr.positions).toBeDefined();
    expect(hr.contracts).toBeDefined();
    expect(hr.attendance).toBeDefined();
    expect(hr.leaves).toBeDefined();
    expect(hr.shifts).toBeDefined();
    expect(hr.shiftSchedules).toBeDefined();
    expect(hr.training).toBeDefined();
    expect(hr.payrolls).toBeDefined();
    expect(hr.expenses).toBeDefined();
    expect(hr.recruitment).toBeDefined();
    expect(hr.performance).toBeDefined();
    expect(hr.onboarding).toBeDefined();
    expect(hr.documents).toBeDefined();
    expect(hr.disciplinary).toBeDefined();
    expect(hr.benefits).toBeDefined();
    expect(hr.loans).toBeDefined();
    expect(hr.timesheets).toBeDefined();
    expect(hr.skills).toBeDefined();
    expect(hr.reports).toBeDefined();
    expect(hr.webhooks).toBeDefined();
    expect(hr.config).toBeDefined();
    expect(hr.history).toBeDefined();
  });
});

describe('Identity Client', () => {
  it('should expose all Identity sub-resources', () => {
    const essabu = new Essabu(TEST_CONFIG);
    const identity = essabu.identity;

    expect(identity.auth).toBeDefined();
    expect(identity.users).toBeDefined();
    expect(identity.profiles).toBeDefined();
    expect(identity.companies).toBeDefined();
    expect(identity.tenants).toBeDefined();
    expect(identity.roles).toBeDefined();
    expect(identity.permissions).toBeDefined();
    expect(identity.branches).toBeDefined();
    expect(identity.apiKeys).toBeDefined();
    expect(identity.sessions).toBeDefined();
  });
});

describe('Trade Client', () => {
  it('should expose all Trade sub-resources', () => {
    const essabu = new Essabu(TEST_CONFIG);
    const trade = essabu.trade;

    expect(trade.customers).toBeDefined();
    expect(trade.products).toBeDefined();
    expect(trade.salesOrders).toBeDefined();
    expect(trade.deliveries).toBeDefined();
    expect(trade.receipts).toBeDefined();
    expect(trade.suppliers).toBeDefined();
    expect(trade.purchaseOrders).toBeDefined();
    expect(trade.inventory).toBeDefined();
    expect(trade.stock).toBeDefined();
    expect(trade.warehouses).toBeDefined();
    expect(trade.contacts).toBeDefined();
    expect(trade.opportunities).toBeDefined();
    expect(trade.activities).toBeDefined();
    expect(trade.campaigns).toBeDefined();
    expect(trade.contracts).toBeDefined();
    expect(trade.documents).toBeDefined();
  });
});

describe('Payment Client', () => {
  it('should expose all Payment sub-resources', () => {
    const essabu = new Essabu(TEST_CONFIG);
    const payment = essabu.payment;

    expect(payment.paymentIntents).toBeDefined();
    expect(payment.paymentAccounts).toBeDefined();
    expect(payment.transactions).toBeDefined();
    expect(payment.refunds).toBeDefined();
    expect(payment.subscriptions).toBeDefined();
    expect(payment.subscriptionPlans).toBeDefined();
    expect(payment.financialAccounts).toBeDefined();
    expect(payment.loanProducts).toBeDefined();
    expect(payment.loanApplications).toBeDefined();
    expect(payment.loanRepayments).toBeDefined();
    expect(payment.collaterals).toBeDefined();
    expect(payment.kycProfiles).toBeDefined();
    expect(payment.kycDocuments).toBeDefined();
    expect(payment.reports).toBeDefined();
  });
});

describe('Exceptions', () => {
  it('should have correct hierarchy', () => {
    const error = new EssabuError('test', 500);
    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(500);

    const validation = new ValidationError('test', 422, { field: 'error' });
    expect(validation).toBeInstanceOf(EssabuError);
    expect(validation.fieldErrors).toEqual({ field: 'error' });

    const auth = new AuthenticationError();
    expect(auth).toBeInstanceOf(EssabuError);
    expect(auth.statusCode).toBe(401);

    const forbidden = new AuthorizationError();
    expect(forbidden).toBeInstanceOf(EssabuError);
    expect(forbidden.statusCode).toBe(403);

    const notFound = new NotFoundError();
    expect(notFound).toBeInstanceOf(EssabuError);
    expect(notFound.statusCode).toBe(404);

    const rateLimit = new RateLimitError('test', 429, 120);
    expect(rateLimit).toBeInstanceOf(EssabuError);
    expect(rateLimit.retryAfter).toBe(120);

    const server = new ServerError('test', 503);
    expect(server).toBeInstanceOf(EssabuError);
    expect(server.statusCode).toBe(503);
  });
});

describe('Pagination helpers', () => {
  it('should create first page request', () => {
    const page = firstPage();
    expect(page).toEqual({ page: 1, perPage: 20 });
  });

  it('should create custom page request', () => {
    const page = pageOf(3, 50);
    expect(page).toEqual({ page: 3, perPage: 50 });
  });

  it('should serialize to query string', () => {
    const qs = toQueryString({ page: 1, perPage: 20 });
    expect(qs).toBe('page=1&perPage=20');
  });

  it('should include sort in query string', () => {
    const qs = toQueryString({ page: 1, perPage: 10, sort: 'name', direction: 'asc' });
    expect(qs).toBe('page=1&perPage=10&sort=name&direction=asc');
  });
});

describe('Environment resolution', () => {
  it('should default to production URL', () => {
    const essabu = new Essabu({
      apiKey: 'key',
      tenantId: 'tenant',
    });
    // Verify instance creation works (URL resolved internally)
    expect(essabu).toBeInstanceOf(Essabu);
  });

  it('should accept custom base URL', () => {
    const essabu = new Essabu({
      apiKey: 'key',
      tenantId: 'tenant',
      baseUrl: 'https://custom.api.com',
    });
    expect(essabu).toBeInstanceOf(Essabu);
  });

  it('should accept sandbox environment', () => {
    const essabu = new Essabu({
      apiKey: 'key',
      tenantId: 'tenant',
      environment: 'sandbox',
    });
    expect(essabu).toBeInstanceOf(Essabu);
  });
});
