import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class SalesOrdersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/sales-orders');
  }
}
