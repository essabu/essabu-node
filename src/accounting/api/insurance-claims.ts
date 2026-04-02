import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class InsuranceClaimsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/insurance-claims');
  }
}
