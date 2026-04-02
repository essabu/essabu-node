import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PriceListsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/price-lists');
  }
}
