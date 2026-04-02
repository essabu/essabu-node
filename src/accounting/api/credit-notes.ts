import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class CreditNotesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/credit-notes');
  }
}
