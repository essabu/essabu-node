import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class BatchesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/batches');
  }
}
