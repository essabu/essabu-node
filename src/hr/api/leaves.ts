import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Leave, CreateLeaveRequest, UpdateLeaveRequest, ApproveLeaveRequest, RejectLeaveRequest } from '../models';

const BASE_PATH = '/api/hr/leaves';

export class LeavesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Leave>> {
    return this.get<PageResponse<Leave>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Leave> {
    const response = await this.get<ApiResponse<Leave>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateLeaveRequest): Promise<Leave> {
    const response = await this.post<ApiResponse<Leave>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateLeaveRequest): Promise<Leave> {
    const response = await this.patch<ApiResponse<Leave>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async approve(id: string, data?: ApproveLeaveRequest): Promise<Leave> {
    const response = await this.post<ApiResponse<Leave>>(`${BASE_PATH}/${id}/approve`, data);
    return response.data;
  }

  async reject(id: string, data: RejectLeaveRequest): Promise<Leave> {
    const response = await this.post<ApiResponse<Leave>>(`${BASE_PATH}/${id}/reject`, data);
    return response.data;
  }

  async cancel(id: string): Promise<Leave> {
    const response = await this.post<ApiResponse<Leave>>(`${BASE_PATH}/${id}/cancel`);
    return response.data;
  }
}
