import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class DocumentsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/documents');
  }
}
