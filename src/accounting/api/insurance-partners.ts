import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class InsurancePartnersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/insurance-partners');
  }
}
