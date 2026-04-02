import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ActivitiesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/activities');
  }
}
