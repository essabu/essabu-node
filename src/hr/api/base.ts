/**
 * Abstract base class shared by all HR API clients.
 */

import type { HttpClient } from '../../common/http-client';
import type { PageRequest, PageResponse } from '../../common/models';

export abstract class BaseHrApi {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected withPagination(basePath: string, page?: PageRequest): string {
    return this.http.withPagination(basePath, page);
  }

  protected withParam(basePath: string, key: string, value: unknown): string {
    return this.http.withParam(basePath, key, value);
  }
}

export type { PageRequest, PageResponse };
