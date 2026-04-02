import { BaseCrudApi } from './base';
import type { HttpClient } from '../../common/http-client';

export class SubscriptionsApi extends BaseCrudApi {
  constructor(http: HttpClient) {
    super(http, '/subscriptions');
  }
}
