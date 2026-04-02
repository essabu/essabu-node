import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const BASE_PATH = '/payrolls';

export class PayrollsApi extends BaseHrApi {
  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(BASE_PATH, data);
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/${id}`);
  }

  async list(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(BASE_PATH, page));
  }

  async calculate(id: string): Promise<Record<string, unknown>> {
    return this.http.put(`${BASE_PATH}/${id}/calculate`);
  }

  async approve(id: string, approvedBy: string): Promise<Record<string, unknown>> {
    return this.http.put(`${BASE_PATH}/${id}/approve`, { approvedBy });
  }

  async downloadPdf(id: string): Promise<ArrayBuffer> {
    return this.http.getBytes(`${BASE_PATH}/${id}/pdf`);
  }

  async getPayslips(payrollId: string): Promise<Record<string, unknown>[]> {
    return this.http.get(`${BASE_PATH}/${payrollId}/payslips`);
  }

  async downloadPayslipPdf(payrollId: string, employeeId: string): Promise<ArrayBuffer> {
    return this.http.getBytes(`${BASE_PATH}/${payrollId}/payslips/${employeeId}/pdf`);
  }

  async getYearToDate(employeeId: string, year: number): Promise<Record<string, unknown>> {
    let path = this.withParam('/payroll-ytd', 'employeeId', employeeId);
    path = this.withParam(path, 'year', year);
    return this.http.get(path);
  }
}
