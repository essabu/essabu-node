import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ExchangeRateProvidersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/exchange-rate-providers');
  }
}
