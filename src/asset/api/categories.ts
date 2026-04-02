import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { AssetCategory, CreateAssetCategoryRequest, UpdateAssetCategoryRequest } from '../models';

const BASE_PATH = '/api/asset/categories';

export class AssetCategoriesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<AssetCategory>> {
    return this.get<PageResponse<AssetCategory>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<AssetCategory> {
    const response = await this.get<ApiResponse<AssetCategory>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateAssetCategoryRequest): Promise<AssetCategory> {
    const response = await this.post<ApiResponse<AssetCategory>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateAssetCategoryRequest): Promise<AssetCategory> {
    const response = await this.patch<ApiResponse<AssetCategory>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
