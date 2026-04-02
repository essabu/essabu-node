import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class QuotesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/quotes');
  }
}
