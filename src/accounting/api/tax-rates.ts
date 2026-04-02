import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class TaxRatesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/tax-rates');
  }
}
