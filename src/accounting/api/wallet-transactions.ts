import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class WalletTransactionsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/wallet-transactions');
  }
}
