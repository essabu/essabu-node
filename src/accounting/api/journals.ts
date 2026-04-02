import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class JournalsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/journals');
  }
}
