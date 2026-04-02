import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Supplier, CreateSupplierRequest, UpdateSupplierRequest } from '../models';

const BASE_PATH = '/api/trade/suppliers';

export class SuppliersApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Supplier>> {
    return this.get<PageResponse<Supplier>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Supplier> {
    const response = await this.get<ApiResponse<Supplier>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateSupplierRequest): Promise<Supplier> {
    const response = await this.post<ApiResponse<Supplier>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateSupplierRequest): Promise<Supplier> {
    const response = await this.patch<ApiResponse<Supplier>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }
}
