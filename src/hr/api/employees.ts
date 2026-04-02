import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../models';

const BASE_PATH = '/api/hr/employees';

export class EmployeesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Employee>> {
    return this.get<PageResponse<Employee>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Employee> {
    const response = await this.get<ApiResponse<Employee>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateEmployeeRequest): Promise<Employee> {
    const response = await this.post<ApiResponse<Employee>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateEmployeeRequest): Promise<Employee> {
    const response = await this.patch<ApiResponse<Employee>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async activate(id: string): Promise<Employee> {
    const response = await this.post<ApiResponse<Employee>>(`${BASE_PATH}/${id}/activate`);
    return response.data;
  }

  async deactivate(id: string): Promise<Employee> {
    const response = await this.post<ApiResponse<Employee>>(`${BASE_PATH}/${id}/deactivate`);
    return response.data;
  }

  async terminate(id: string, terminationDate: string, reason?: string): Promise<Employee> {
    const response = await this.post<ApiResponse<Employee>>(`${BASE_PATH}/${id}/terminate`, {
      terminationDate,
      reason,
    });
    return response.data;
  }
}
