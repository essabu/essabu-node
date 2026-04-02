import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class StockMovementsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/stock-movements');
  }
}
