import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class StockApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/stock');
  }
}
