import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class InventoryItemsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/inventory');
  }
}
