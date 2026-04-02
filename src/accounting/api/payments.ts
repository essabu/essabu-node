import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PaymentsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/payments');
  }
}
