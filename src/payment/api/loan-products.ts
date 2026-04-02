import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class LoanProductsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/loan-products');
  }
}
