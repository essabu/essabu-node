import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ReceiptsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/receipts');
  }
}
