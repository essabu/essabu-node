import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class AccountsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/accounts');
  }
}
