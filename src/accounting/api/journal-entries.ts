import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class JournalEntriesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/journal-entries');
  }
}
