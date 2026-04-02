import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ReportsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/reports');
  }
}
