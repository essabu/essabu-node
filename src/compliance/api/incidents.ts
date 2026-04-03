import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Incident, CreateIncidentRequest, UpdateIncidentRequest } from '../models';

const BASE_PATH = '/api/compliance/incidents';

export class IncidentApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Incident>> {
    return this.get<PageResponse<Incident>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Incident> {
    const response = await this.get<ApiResponse<Incident>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateIncidentRequest): Promise<Incident> {
    const response = await this.post<ApiResponse<Incident>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateIncidentRequest): Promise<Incident> {
    const response = await this.patch<ApiResponse<Incident>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
