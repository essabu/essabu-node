import { CrudApi } from './base';
import type { PermissionResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class PermissionsApi extends CrudApi<PermissionResponse> {
  constructor(http: HttpClient) {
    super(http, '/permissions');
  }
}
