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

describe('EmployeesApi', () => {
  let essabu: Essabu;

  beforeEach(() => {
    essabu = new Essabu(TEST_CONFIG);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('create', () => {
    it('should POST to /hr/employees', async () => {
      const created = { id: 'emp_1', firstName: 'Jean', lastName: 'Mukendi' };
      mockFetchJson(201, created);

      const result = await essabu.hr.employees.create({
        firstName: 'Jean',
        lastName: 'Mukendi',
        email: 'jean@example.com',
      });

      expect(result).toEqual(created);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees',
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('get', () => {
    it('should GET /hr/employees/:id', async () => {
      const employee = { id: 'emp_1', firstName: 'Jean', lastName: 'Mukendi' };
      mockFetchJson(200, employee);

      const result = await essabu.hr.employees.get('emp_1');

      expect(result).toEqual(employee);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees/emp_1',
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('list', () => {
    it('should GET /hr/employees with pagination', async () => {
      const page = {
        data: [
          { id: 'emp_1', firstName: 'Jean' },
          { id: 'emp_2', firstName: 'Marie' },
        ],
        page: 1,
        perPage: 20,
        totalElements: 2,
        totalPages: 1,
      };
      mockFetchJson(200, page);

      const result = await essabu.hr.employees.list({ page: 1, perPage: 20 });

      expect(result.data).toHaveLength(2);
      expect(result.totalElements).toBe(2);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees?page=1&perPage=20',
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('should GET /hr/employees without pagination', async () => {
      const page = {
        data: [],
        page: 1,
        perPage: 20,
        totalElements: 0,
        totalPages: 0,
      };
      mockFetchJson(200, page);

      await essabu.hr.employees.list();

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees',
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('update', () => {
    it('should PUT /hr/employees/:id', async () => {
      const updated = { id: 'emp_1', firstName: 'Jean', phone: '+243820000000' };
      mockFetchJson(200, updated);

      const result = await essabu.hr.employees.update('emp_1', {
        phone: '+243820000000',
      });

      expect(result).toEqual(updated);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees/emp_1',
        expect.objectContaining({ method: 'PUT' }),
      );
    });
  });

  describe('delete', () => {
    it('should DELETE /hr/employees/:id', async () => {
      mockFetchVoid();

      await essabu.hr.employees.delete('emp_1');

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees/emp_1',
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('getLeaveBalances', () => {
    it('should GET /hr/employees/:id/leave-balance', async () => {
      const balances = [
        { type: 'annual', balance: 18, used: 5 },
        { type: 'sick', balance: 10, used: 2 },
      ];
      mockFetchJson(200, balances);

      const result = await essabu.hr.employees.getLeaveBalances('emp_1');

      expect(result).toEqual(balances);
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/hr/employees/emp_1/leave-balance',
        expect.objectContaining({ method: 'GET' }),
      );
    });
  });

  describe('getDocuments', () => {
    it('should GET /hr/employees/:id/documents', async () => {
      const docs = [{ id: 'doc_1', name: 'contract.pdf' }];
      mockFetchJson(200, docs);

      const result = await essabu.hr.employees.getDocuments('emp_1');

      expect(result).toEqual(docs);
    });
  });

  describe('getHistory', () => {
    it('should GET /hr/employees/:id/history', async () => {
      const history = [{ id: 'hist_1', event: 'hired', date: '2024-01-01' }];
      mockFetchJson(200, history);

      const result = await essabu.hr.employees.getHistory('emp_1');

      expect(result).toEqual(history);
    });
  });

  describe('getOrgChart', () => {
    it('should GET /hr/employees/org-chart', async () => {
      const orgChart = { root: { id: 'emp_1', children: [] } };
      mockFetchJson(200, orgChart);

      const result = await essabu.hr.employees.getOrgChart();

      expect(result).toEqual(orgChart);
    });
  });
});
