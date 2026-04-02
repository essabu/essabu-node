import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Role, CreateRoleRequest, UpdateRoleRequest, Permission } from '../models';

const BASE_PATH = '/api/identity/roles';

export class RolesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Role>> {
    return this.get<PageResponse<Role>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Role> {
    const response = await this.get<ApiResponse<Role>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateRoleRequest): Promise<Role> {
    const response = await this.post<ApiResponse<Role>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateRoleRequest): Promise<Role> {
    const response = await this.patch<ApiResponse<Role>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async listPermissions(): Promise<Permission[]> {
    const response = await this.get<ApiResponse<Permission[]>>('/api/identity/permissions');
    return response.data;
  }
}
