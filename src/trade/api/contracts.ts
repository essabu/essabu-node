import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ContractsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/contracts');
  }
}
