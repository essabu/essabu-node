import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class BalancesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/balances');
  }
}
