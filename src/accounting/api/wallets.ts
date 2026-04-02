import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class WalletsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/wallets');
  }
}
