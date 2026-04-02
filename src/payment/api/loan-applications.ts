import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class LoanApplicationsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/loan-applications');
  }
}
