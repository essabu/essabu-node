import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../models';

const BASE_PATH = '/api/trade/products';

export class ProductsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Product>> {
    return this.get<PageResponse<Product>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Product> {
    const response = await this.get<ApiResponse<Product>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateProductRequest): Promise<Product> {
    const response = await this.post<ApiResponse<Product>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateProductRequest): Promise<Product> {
    const response = await this.patch<ApiResponse<Product>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
