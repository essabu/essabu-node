import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class SuppliersApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/suppliers');
  }
}
