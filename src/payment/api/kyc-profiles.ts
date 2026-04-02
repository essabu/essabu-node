import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class KycProfilesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/kyc-profiles');
  }
}
