import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest } from '../models';

const BASE_PATH = '/api/trade/invoices';

export class InvoicesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Invoice>> {
    return this.get<PageResponse<Invoice>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Invoice> {
    const response = await this.get<ApiResponse<Invoice>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateInvoiceRequest): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateInvoiceRequest): Promise<Invoice> {
    const response = await this.patch<ApiResponse<Invoice>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async issue(id: string): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(`${BASE_PATH}/${id}/issue`);
    return response.data;
  }

  async markPaid(id: string, paidAt?: string): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(`${BASE_PATH}/${id}/mark-paid`, { paidAt });
    return response.data;
  }

  async cancel(id: string, reason?: string): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(`${BASE_PATH}/${id}/cancel`, { reason });
    return response.data;
  }

  async duplicate(id: string): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(`${BASE_PATH}/${id}/duplicate`);
    return response.data;
  }

  async sendByEmail(id: string, email?: string): Promise<void> {
    await this.post(`${BASE_PATH}/${id}/send`, { email });
  }
}
