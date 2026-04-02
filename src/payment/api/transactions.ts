import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class TransactionsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/transactions');
  }
}
