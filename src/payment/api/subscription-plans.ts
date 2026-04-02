import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class SubscriptionPlansApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/subscription-plans');
  }
}
