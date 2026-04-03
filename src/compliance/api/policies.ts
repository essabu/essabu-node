import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Policy, CreatePolicyRequest, UpdatePolicyRequest } from '../models';

const BASE_PATH = '/api/compliance/policies';

export class PolicyApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Policy>> {
    return this.get<PageResponse<Policy>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Policy> {
    const response = await this.get<ApiResponse<Policy>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreatePolicyRequest): Promise<Policy> {
    const response = await this.post<ApiResponse<Policy>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdatePolicyRequest): Promise<Policy> {
    const response = await this.patch<ApiResponse<Policy>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
