import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PriceListOverridesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/price-list-overrides');
  }
}
