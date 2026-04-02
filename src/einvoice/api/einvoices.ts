import { BaseApi } from '../../common/models';
import type { PageRequest, PageResponse, ApiResponse } from '../../common/models';
import type { EInvoice, CreateEInvoiceRequest, EInvoiceValidationResult } from '../models';

const BASE_PATH = '/api/einvoice/einvoices';

export class EInvoicesApi extends BaseApi {
  async list(params?: PageRequest): Promise<PageResponse<EInvoice>> {
    return this.get<PageResponse<EInvoice>>(BASE_PATH, this.buildPageQuery(params));
  }

  async retrieve(id: string): Promise<EInvoice> {
    const response = await this.get<ApiResponse<EInvoice>>(`${BASE_PATH}/${id}`);
    return response.data;
  }

  async create(data: CreateEInvoiceRequest): Promise<EInvoice> {
    const response = await this.post<ApiResponse<EInvoice>>(BASE_PATH, data);
    return response.data;
  }

  async remove(id: string): Promise<void> {
    await this.delete(`${BASE_PATH}/${id}`);
  }

  async submit(id: string): Promise<EInvoice> {
    const response = await this.post<ApiResponse<EInvoice>>(`${BASE_PATH}/${id}/submit`);
    return response.data;
  }

  async validate(id: string): Promise<EInvoiceValidationResult> {
    return this.get<EInvoiceValidationResult>(`${BASE_PATH}/${id}/validate`);
  }

  async downloadXml(id: string): Promise<string> {
    return this.get<string>(`${BASE_PATH}/${id}/xml`);
  }

  async downloadPdf(id: string): Promise<string> {
    return this.get<string>(`${BASE_PATH}/${id}/pdf`);
  }
}
