import { CrudApi } from './base';
import type { ApiKeyResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class ApiKeysApi extends CrudApi<ApiKeyResponse> {
  constructor(http: HttpClient) {
    super(http, '/api-keys');
  }
}
