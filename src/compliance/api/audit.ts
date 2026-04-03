import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Audit, CreateAuditRequest, UpdateAuditRequest } from '../models';

const BASE_PATH = '/api/compliance/audits';

export class AuditApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Audit>> {
    return this.get<PageResponse<Audit>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Audit> {
    const response = await this.get<ApiResponse<Audit>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateAuditRequest): Promise<Audit> {
    const response = await this.post<ApiResponse<Audit>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateAuditRequest): Promise<Audit> {
    const response = await this.patch<ApiResponse<Audit>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
