import { CrudApi } from './base';
import type { RoleResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class RolesApi extends CrudApi<RoleResponse> {
  constructor(http: HttpClient) {
    super(http, '/roles');
  }
}
