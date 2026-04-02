import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PaymentTermsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/payment-terms');
  }
}
