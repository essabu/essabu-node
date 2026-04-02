import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { Quotation, CreateQuotationRequest, UpdateQuotationRequest } from '../models';
import type { Invoice } from '../models';

const BASE_PATH = '/api/trade/quotations';

export class QuotationsApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<Quotation>> {
    return this.get<PageResponse<Quotation>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<Quotation> {
    const response = await this.get<ApiResponse<Quotation>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateQuotationRequest): Promise<Quotation> {
    const response = await this.post<ApiResponse<Quotation>>(BASE_PATH, data);
    return response.data;
  }

  async update(id: string, data: UpdateQuotationRequest): Promise<Quotation> {
    const response = await this.patch<ApiResponse<Quotation>>(`${BASE_PATH}/${id}`, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async accept(id: string): Promise<Quotation> {
    const response = await this.post<ApiResponse<Quotation>>(`${BASE_PATH}/${id}/accept`);
    return response.data;
  }

  async reject(id: string, reason?: string): Promise<Quotation> {
    const response = await this.post<ApiResponse<Quotation>>(`${BASE_PATH}/${id}/reject`, { reason });
    return response.data;
  }

  async convertToInvoice(id: string): Promise<Invoice> {
    const response = await this.post<ApiResponse<Invoice>>(`${BASE_PATH}/${id}/convert-to-invoice`);
    return response.data;
  }

  async sendByEmail(id: string, email?: string): Promise<void> {
    await this.post(`${BASE_PATH}/${id}/send`, { email });
  }
}
