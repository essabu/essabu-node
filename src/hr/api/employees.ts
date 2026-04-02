import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const BASE_PATH = '/employees';

export class EmployeesApi extends BaseHrApi {
  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(BASE_PATH, data);
  }

  async get(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/${id}`);
  }

  async list(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(BASE_PATH, page));
  }

  async update(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${BASE_PATH}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete(`${BASE_PATH}/${id}`);
  }

  async getLeaveBalances(employeeId: string): Promise<Record<string, unknown>[]> {
    return this.http.get(`${BASE_PATH}/${employeeId}/leave-balance`);
  }

  async getHistory(employeeId: string): Promise<Record<string, unknown>[]> {
    return this.http.get(`${BASE_PATH}/${employeeId}/history`);
  }

  async getDocuments(employeeId: string): Promise<Record<string, unknown>[]> {
    return this.http.get(`${BASE_PATH}/${employeeId}/documents`);
  }

  async getOrgTree(employeeId: string): Promise<Record<string, unknown>[]> {
    return this.http.get(`${BASE_PATH}/${employeeId}/org-tree`);
  }

  async getOrgChart(): Promise<Record<string, unknown>> {
    return this.http.get(`${BASE_PATH}/org-chart`);
  }
}
