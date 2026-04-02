import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { User, CreateUserRequest, UpdateUserRequest, ChangePasswordRequest } from '../models';

const BASE_PATH = '/api/identity/users';

export class UsersApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<User>> {
    return this.get<PageResponse<User>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<User> {
    const response = await this.get<ApiResponse<User>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateUserRequest): Promise<User> {
    const response = await this.post<ApiResponse<User>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await this.patch<ApiResponse<User>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async me(): Promise<User> {
    const response = await this.get<ApiResponse<User>>(`${BASE_PATH}/me`);
    return response.data;
  }

  async changePassword(id: string, data: ChangePasswordRequest): Promise<void> {
    await this.post(`${BASE_PATH}/${id}/change-password`, data);
  }

  async activate(id: string): Promise<User> {
    const response = await this.post<ApiResponse<User>>(`${BASE_PATH}/${id}/activate`);
    return response.data;
  }

  async deactivate(id: string): Promise<User> {
    const response = await this.post<ApiResponse<User>>(`${BASE_PATH}/${id}/deactivate`);
    return response.data;
  }
}
