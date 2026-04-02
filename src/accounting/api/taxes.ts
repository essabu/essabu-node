import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Tax, CreateTaxRequest, UpdateTaxRequest } from '../models';

const BASE_PATH = '/api/accounting/taxes';

export class TaxesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Tax>> {
    return this.get<PageResponse<Tax>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Tax> {
    const response = await this.get<ApiResponse<Tax>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateTaxRequest): Promise<Tax> {
    const response = await this.post<ApiResponse<Tax>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateTaxRequest): Promise<Tax> {
    const response = await this.patch<ApiResponse<Tax>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
