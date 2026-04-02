import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class PeriodsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/periods');
  }
}
