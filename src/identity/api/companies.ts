import { CrudApi } from './base';
import type { CompanyResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class CompaniesApi extends CrudApi<CompanyResponse> {
  constructor(http: HttpClient) {
    super(http, '/companies');
  }
}
