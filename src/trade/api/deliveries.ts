import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class DeliveriesApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/deliveries');
  }
}
