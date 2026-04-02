import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Essabu } from '../../src/client';
import type { EssabuConfig } from '../../src/config';

const TEST_CONFIG: EssabuConfig = {
  apiKey: 'test-api-key',
  tenantId: 'test-tenant-id',
  baseUrl: 'https://test.essabu.com',
};

function mockFetchJson(status: number, data: unknown): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      headers: new Headers(),
      json: vi.fn().mockResolvedValue(data),
      text: vi.fn().mockResolvedValue(JSON.stringify(data)),
    }),
  );
}

function mockFetchVoid(status: number = 204): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: true,
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({}),
      text: vi.fn().mockResolvedValue(''),
    }),
  );
}

describe('InvoicesApi (Accounting)', () => {
  let essabu: Essabu;

  beforeEach(() => {
    essabu = new Essabu(TEST_CONFIG);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('create', () => {
    it('should POST to /accounting/invoices', async () => {
      const invoice = {
        id: 'inv_1',
        invoiceNumber: 'INV-2024-001',
        total: 12290,
        currency: 'USD',
        status: 'draft',
        statusLabel: 'Brouillon',
        statusColor: 'gray',
      };
      mockFetchJson(201, invoice);

      const result = await essabu.accounting.invoices.create({
        customerId: 'cust_1',
        invoiceDate: '2024-03-15',
        dueDate: '2024-04-15',
        currency: 'USD',
        items: [
          { description: 'Service', quantity: 1, unitPrice: 12290, taxRate: 0 },
        ],
      });

      expect(result).toEqual(invoice);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/accounting/invoices',
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('get', () => {
    it('should GET /accounting/invoices/:id', async () => {
      const invoice = {
        id: 'inv_1',
        invoiceNumber: 'INV-2024-001',
        status: 'finalized',
        statusLabel: 'Finalisée',
        statusColor: 'blue',
      };
      mockFetchJson(200, invoice);

      const result = await essabu.accounting.invoices.get('inv_1');

      expect(result).toEqual(invoice);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/accounting/invoices/inv_1',
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('list', () => {
    it('should GET /accounting/invoices with query params', async () => {
      const page = {
        data: [
          { id: 'inv_1', invoiceNumber: 'INV-001' },
          { id: 'inv_2', invoiceNumber: 'INV-002' },
        ],
        page: 1,
        perPage: 10,
        totalElements: 2,
        totalPages: 1,
      };
      mockFetchJson(200, page);

      const result = await essabu.accounting.invoices.list({
        page: 1,
        perPage: 10,
      });

      expect(result.data).toHaveLength(2);
      expect(result.totalElements).toBe(2);
    });
  });

  describe('update', () => {
    it('should PATCH /accounting/invoices/:id', async () => {
      const updated = {
        id: 'inv_1',
        notes: 'Updated notes',
      };
      mockFetchJson(200, updated);

      const result = await essabu.accounting.invoices.update('inv_1', {
        notes: 'Updated notes',
      });

      expect(result).toEqual(updated);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/accounting/invoices/inv_1',
        expect.objectContaining({ method: 'PATCH' }),
      );
    });
  });

  describe('delete', () => {
    it('should DELETE /accounting/invoices/:id', async () => {
      mockFetchVoid();

      await essabu.accounting.invoices.delete('inv_1');

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/accounting/invoices/inv_1',
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });
});

describe('AccountingClient sub-resources', () => {
  let essabu: Essabu;

  beforeEach(() => {
    essabu = new Essabu(TEST_CONFIG);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should access payments API', async () => {
    mockFetchJson(200, { data: [], page: 1, perPage: 20, totalElements: 0, totalPages: 0 });

    const result = await essabu.accounting.payments.list({ page: 1 });
    expect(result.data).toEqual([]);
  });

  it('should access accounts API', async () => {
    mockFetchJson(200, { data: [], page: 1, perPage: 20, totalElements: 0, totalPages: 0 });

    const result = await essabu.accounting.accounts.list({ page: 1 });
    expect(result.data).toEqual([]);
  });

  it('should access journals API', async () => {
    mockFetchJson(200, { data: [], page: 1, perPage: 20, totalElements: 0, totalPages: 0 });

    const result = await essabu.accounting.journals.list({ page: 1 });
    expect(result.data).toEqual([]);
  });

  it('should expose all accounting sub-resources', () => {
    expect(essabu.accounting.invoices).toBeDefined();
    expect(essabu.accounting.payments).toBeDefined();
    expect(essabu.accounting.accounts).toBeDefined();
    expect(essabu.accounting.journals).toBeDefined();
    expect(essabu.accounting.journalEntries).toBeDefined();
    expect(essabu.accounting.taxRates).toBeDefined();
    expect(essabu.accounting.currencies).toBeDefined();
    expect(essabu.accounting.fiscalYears).toBeDefined();
    expect(essabu.accounting.periods).toBeDefined();
    expect(essabu.accounting.balances).toBeDefined();
    expect(essabu.accounting.reports).toBeDefined();
    expect(essabu.accounting.webhooks).toBeDefined();
  });
});
