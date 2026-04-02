import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PurchaseOrdersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/purchase-orders');
  }
}
