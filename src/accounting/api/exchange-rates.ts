import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ExchangeRatesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/exchange-rates');
  }
}
