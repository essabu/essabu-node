import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ConfigApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/config');
  }
}
