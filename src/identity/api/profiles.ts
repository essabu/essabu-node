import { CrudApi } from './base';
import type { ProfileResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class ProfilesApi extends CrudApi<ProfileResponse> {
  constructor(http: HttpClient) {
    super(http, '/profiles');
  }
}
