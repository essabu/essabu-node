import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class FiscalYearsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/fiscal-years');
  }
}
