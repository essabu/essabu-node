import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PaymentIntentsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/payment-intents');
  }
}
