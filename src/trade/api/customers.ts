import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class CustomersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/customers');
  }
}
