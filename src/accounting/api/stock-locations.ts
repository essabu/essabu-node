import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class StockLocationsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/stock-locations');
  }
}
