import { CrudApi } from './base';
import type { BranchResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class BranchesApi extends CrudApi<BranchResponse> {
  constructor(http: HttpClient) {
    super(http, '/branches');
  }
}
