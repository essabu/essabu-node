import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../models';

const BASE_PATH = '/api/payment/payments';

export class PaymentsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Payment>> {
    return this.get<PageResponse<Payment>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Payment> {
    const response = await this.get<ApiResponse<Payment>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreatePaymentRequest): Promise<Payment> {
    const response = await this.post<ApiResponse<Payment>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdatePaymentRequest): Promise<Payment> {
    const response = await this.patch<ApiResponse<Payment>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async process(id: string): Promise<Payment> {
    const response = await this.post<ApiResponse<Payment>>(`${BASE_PATH}/${id}/process`);
    return response.data;
  }

  async cancel(id: string, reason?: string): Promise<Payment> {
    const response = await this.post<ApiResponse<Payment>>(`${BASE_PATH}/${id}/cancel`, { reason });
    return response.data;
  }

  async refund(id: string, amount?: number): Promise<Payment> {
    const response = await this.post<ApiResponse<Payment>>(`${BASE_PATH}/${id}/refund`, { amount });
    return response.data;
  }
}
