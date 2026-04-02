import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class WarehousesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/warehouses');
  }
}
