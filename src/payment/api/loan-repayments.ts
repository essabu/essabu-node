import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class LoanRepaymentsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/loan-repayments');
  }
}
