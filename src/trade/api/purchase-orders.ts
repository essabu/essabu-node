import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { PurchaseOrder, CreatePurchaseOrderRequest, UpdatePurchaseOrderRequest } from '../models';

const BASE_PATH = '/api/trade/purchase-orders';

export class PurchaseOrdersApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<PurchaseOrder>> {
    return this.get<PageResponse<PurchaseOrder>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<PurchaseOrder> {
    const response = await this.get<ApiResponse<PurchaseOrder>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreatePurchaseOrderRequest): Promise<PurchaseOrder> {
    const response = await this.post<ApiResponse<PurchaseOrder>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdatePurchaseOrderRequest): Promise<PurchaseOrder> {
    const response = await this.patch<ApiResponse<PurchaseOrder>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async approve(id: string): Promise<PurchaseOrder> {
    const response = await this.post<ApiResponse<PurchaseOrder>>(`${BASE_PATH}/${id}/approve`);
    return response.data;
  }

  async receive(id: string): Promise<PurchaseOrder> {
    const response = await this.post<ApiResponse<PurchaseOrder>>(`${BASE_PATH}/${id}/receive`);
    return response.data;
  }

  async cancel(id: string, reason?: string): Promise<PurchaseOrder> {
    const response = await this.post<ApiResponse<PurchaseOrder>>(`${BASE_PATH}/${id}/cancel`, { reason });
    return response.data;
  }
}
