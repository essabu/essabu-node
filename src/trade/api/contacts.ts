import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class ContactsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/contacts');
  }
}
