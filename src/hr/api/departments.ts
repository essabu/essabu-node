import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from '../models';

const BASE_PATH = '/api/hr/departments';

export class DepartmentsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Department>> {
    return this.get<PageResponse<Department>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Department> {
    const response = await this.get<ApiResponse<Department>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateDepartmentRequest): Promise<Department> {
    const response = await this.post<ApiResponse<Department>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateDepartmentRequest): Promise<Department> {
    const response = await this.patch<ApiResponse<Department>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
