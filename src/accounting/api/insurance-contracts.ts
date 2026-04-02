import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class InsuranceContractsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/insurance-contracts');
  }
}
