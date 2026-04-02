import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class KycDocumentsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/kyc-documents');
  }
}
