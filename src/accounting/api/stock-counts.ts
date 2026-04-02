import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class StockCountsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/stock-counts');
  }
}
