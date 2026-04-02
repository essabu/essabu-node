import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class FinancialAccountsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/financial-accounts');
  }
}
