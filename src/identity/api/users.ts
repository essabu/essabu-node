import { CrudApi } from './base';
import type { UserResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class UsersApi extends CrudApi<UserResponse> {
  constructor(http: HttpClient) {
    super(http, '/users');
  }
}
