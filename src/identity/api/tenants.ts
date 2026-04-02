import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Tenant, CreateTenantRequest, UpdateTenantRequest } from '../models';

const BASE_PATH = '/api/identity/tenants';

export class TenantsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Tenant>> {
    return this.get<PageResponse<Tenant>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Tenant> {
    const response = await this.get<ApiResponse<Tenant>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateTenantRequest): Promise<Tenant> {
    const response = await this.post<ApiResponse<Tenant>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateTenantRequest): Promise<Tenant> {
    const response = await this.patch<ApiResponse<Tenant>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async current(): Promise<Tenant> {
    const response = await this.get<ApiResponse<Tenant>>(`${BASE_PATH}/current`);
    return response.data;
  }
}
