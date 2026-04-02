import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class InvoicesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/invoices');
  }
}
