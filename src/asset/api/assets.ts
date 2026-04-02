import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Asset, CreateAssetRequest, UpdateAssetRequest, DisposeAssetRequest } from '../models';

const BASE_PATH = '/api/asset/assets';

export class AssetsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Asset>> {
    return this.get<PageResponse<Asset>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Asset> {
    const response = await this.get<ApiResponse<Asset>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateAssetRequest): Promise<Asset> {
    const response = await this.post<ApiResponse<Asset>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateAssetRequest): Promise<Asset> {
    const response = await this.patch<ApiResponse<Asset>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async dispose(id: string, data: DisposeAssetRequest): Promise<Asset> {
    const response = await this.post<ApiResponse<Asset>>(`${BASE_PATH}/${id}/dispose`, data);
    return response.data;
  }

  async activate(id: string): Promise<Asset> {
    const response = await this.post<ApiResponse<Asset>>(`${BASE_PATH}/${id}/activate`);
    return response.data;
  }
}
