import type { HttpClient } from '../../common/http-client';
import type {
  NormalizeInvoiceRequest,
  NormalizedInvoiceResponse,
} from '../models';

export class InvoicesApi {
  constructor(private readonly http: HttpClient) {}

  async normalize(data: NormalizeInvoiceRequest): Promise<NormalizedInvoiceResponse> {
    return this.http.post('/invoices/normalize', data as unknown as Record<string, unknown>);
  }
}
