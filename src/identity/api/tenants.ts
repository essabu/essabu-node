import { CrudApi } from './base';
import type { TenantResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class TenantsApi extends CrudApi<TenantResponse> {
  constructor(http: HttpClient) {
    super(http, '/tenants');
  }
}
