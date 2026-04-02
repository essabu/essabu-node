/**
 * Pagination request parameters.
 */
export interface PageRequest {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page (default: 25, max: 100) */
  pageSize?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
  /** Search query */
  search?: string;
  /** Additional filters */
  filters?: Record<string, string | number | boolean>;
}

/**
 * Paginated response wrapper.
 */
export interface PageResponse<T> {
  data: T[];
  meta: PageMeta;
}

export interface PageMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Standard API response for single items.
 */
export interface ApiResponse<T> {
  data: T;
}

/**
 * Common base fields present on most API resources.
 */
export interface BaseResource {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * HTTP method type.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request options passed to the HTTP client.
 */
export interface RequestOptions {
  method: HttpMethod;
  path: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

/**
 * Base API class that all module API classes extend.
 * Provides convenience methods for CRUD operations.
 */
export abstract class BaseApi {
  constructor(protected readonly httpClient: HttpClientInterface) {}

  protected async get<T>(path: string, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.httpClient.request<T>({ method: 'GET', path, query });
  }

  protected async post<T>(path: string, body?: unknown): Promise<T> {
    return this.httpClient.request<T>({ method: 'POST', path, body });
  }

  protected async put<T>(path: string, body?: unknown): Promise<T> {
    return this.httpClient.request<T>({ method: 'PUT', path, body });
  }

  protected async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.httpClient.request<T>({ method: 'PATCH', path, body });
  }

  protected async delete<T = void>(path: string): Promise<T> {
    return this.httpClient.request<T>({ method: 'DELETE', path });
  }

  /**
   * Build query string parameters from a PageRequest.
   */
  protected buildPageQuery(params?: PageRequest): Record<string, string | number | boolean | undefined> {
    if (!params) return {};

    const query: Record<string, string | number | boolean | undefined> = {};

    if (params.page !== undefined) query['page'] = params.page;
    if (params.pageSize !== undefined) query['pageSize'] = params.pageSize;
    if (params.sortBy !== undefined) query['sortBy'] = params.sortBy;
    if (params.sortOrder !== undefined) query['sortOrder'] = params.sortOrder;
    if (params.search !== undefined) query['search'] = params.search;

    if (params.filters) {
      for (const [key, value] of Object.entries(params.filters)) {
        query[`filter[${key}]`] = value;
      }
    }

    return query;
  }
}

/**
 * Interface that the HTTP client must implement.
 */
export interface HttpClientInterface {
  request<T>(options: RequestOptions): Promise<T>;
}
