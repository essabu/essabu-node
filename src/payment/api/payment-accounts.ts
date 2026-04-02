import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PaymentAccountsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/payment-accounts');
  }
}
