import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Depreciation, RunDepreciationRequest } from '../models';

const BASE_PATH = '/api/asset/depreciations';

export class DepreciationsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Depreciation>> {
    return this.get<PageResponse<Depreciation>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Depreciation> {
    const response = await this.get<ApiResponse<Depreciation>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async run(data: RunDepreciationRequest): Promise<Depreciation[]> {
    const response = await this.post<ApiResponse<Depreciation[]>>(`${BASE_PATH}/run`, data);
    return response.data;
  }

  async post_(id: string): Promise<Depreciation> {
    const response = await this.post<ApiResponse<Depreciation>>(`${BASE_PATH}/${id}/post`);
    return response.data;
  }
}
