import type { HttpClient } from '../../common/http-client';

export abstract class BaseProjectApi {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }
}
