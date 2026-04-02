import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class CollateralsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/collaterals');
  }
}
