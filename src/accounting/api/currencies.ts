import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class CurrenciesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/currencies');
  }
}
