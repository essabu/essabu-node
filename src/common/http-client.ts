/**
 * Unified HTTP client using the native fetch API.
 * Handles authentication, retries, timeouts, and error mapping.
 */

import type { EssabuConfig } from '../config';
import { AuthHandler } from './auth';
import type { PageRequest } from './models';
import { toQueryString } from './models';
import {
  AuthenticationError,
  AuthorizationError,
  EssabuError,
  NotFoundError,
  RateLimitError,
  ServerError,
  ValidationError,
} from './exceptions';

const BASE_DELAY_MS = 1000;
const SDK_VERSION = '1.0.0';

export class HttpClient {
  private readonly baseUrl: string;
  private readonly auth: AuthHandler;
  private readonly maxRetries: number;
  private readonly timeoutMs: number;

  constructor(config: EssabuConfig, basePath: string = '') {
    const root = config.baseUrl?.replace(/\/+$/, '') ?? 'https://api.essabu.com';
    this.baseUrl = basePath ? `${root}${basePath}` : root;
    this.auth = new AuthHandler(config);
    this.maxRetries = config.maxRetries ?? 3;
    this.timeoutMs = config.timeout ?? 30_000;
  }

  /** Set a bearer token for subsequent requests. */
  setToken(token: string): void {
    this.auth.setToken(token);
  }

  /** Clear the bearer token. */
  clearToken(): void {
    this.auth.clearToken();
  }

  // -- Public HTTP methods ----------------------------------------------------

  async get<T = Record<string, unknown>>(path: string, params?: Record<string, unknown>): Promise<T> {
    let url = path;
    if (params) {
      const filtered = Object.entries(params).filter(
        ([, v]) => v !== undefined && v !== null,
      );
      if (filtered.length > 0) {
        const sep = url.includes('?') ? '&' : '?';
        const qs = filtered.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
        url = `${url}${sep}${qs}`;
      }
    }
    const response = await this.execute('GET', url);
    return response.json() as Promise<T>;
  }

  async getBytes(path: string): Promise<ArrayBuffer> {
    const response = await this.execute('GET', path);
    return response.arrayBuffer();
  }

  async post<T = Record<string, unknown>>(path: string, body?: unknown): Promise<T> {
    const response = await this.execute('POST', path, body);
    if (response.status === 204) return {} as T;
    return response.json() as Promise<T>;
  }

  async postVoid(path: string, body?: unknown): Promise<void> {
    await this.execute('POST', path, body);
  }

  async put<T = Record<string, unknown>>(path: string, body?: unknown): Promise<T> {
    const response = await this.execute('PUT', path, body);
    if (response.status === 204) return {} as T;
    return response.json() as Promise<T>;
  }

  async patch<T = Record<string, unknown>>(path: string, body?: unknown): Promise<T> {
    const response = await this.execute('PATCH', path, body);
    if (response.status === 204) return {} as T;
    return response.json() as Promise<T>;
  }

  async delete(path: string): Promise<void> {
    await this.execute('DELETE', path);
  }

  async postMultipart<T = Record<string, unknown>>(path: string, formData: FormData): Promise<T> {
    const headers = this.auth.getHeaders();
    // Do not set Content-Type for multipart -- fetch sets it with boundary
    delete headers['Content-Type'];
    headers['User-Agent'] = `essabu-node/${SDK_VERSION}`;
    const url = this.baseUrl + path;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.json() as Promise<T>;
    }
    return this.handleError(response);
  }

  // -- Pagination helpers -----------------------------------------------------

  /** Append pagination query parameters to a base path. */
  withPagination(basePath: string, page?: PageRequest): string {
    if (!page) return basePath;
    const separator = basePath.includes('?') ? '&' : '?';
    return `${basePath}${separator}${toQueryString(page)}`;
  }

  /** Append a single query parameter to a base path. */
  withParam(basePath: string, key: string, value: unknown): string {
    if (value === undefined || value === null) return basePath;
    const separator = basePath.includes('?') ? '&' : '?';
    return `${basePath}${separator}${key}=${encodeURIComponent(String(value))}`;
  }

  // -- Private helpers --------------------------------------------------------

  private async execute(method: string, path: string, body?: unknown): Promise<Response> {
    const url = this.baseUrl + path;
    const headers: Record<string, string> = {
      ...this.auth.getHeaders(),
      'Content-Type': 'application/json',
      'User-Agent': `essabu-node/${SDK_VERSION}`,
    };

    let attempt = 0;

    while (true) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

      let response: Response;
      try {
        response = await fetch(url, {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });
      } catch (error) {
        clearTimeout(timeout);
        throw new ServerError(
          `Communication error with the Essabu API: ${error}`,
          0,
        );
      } finally {
        clearTimeout(timeout);
      }

      const status = response.status;

      // Handle rate limiting
      if (status === 429) {
        const retryAfter = parseInt(
          response.headers.get('Retry-After') ?? '60',
          10,
        );
        throw new RateLimitError('Rate limit exceeded', 429, retryAfter);
      }

      // Retry on 5xx
      if (status >= 500) {
        attempt++;
        if (attempt <= this.maxRetries) {
          await this.sleep(BASE_DELAY_MS * Math.pow(2, attempt - 1));
          continue;
        }
        const text = await response.text();
        throw new ServerError(
          `Server error after ${this.maxRetries} retries: ${text}`,
          status,
        );
      }

      // Success
      if (status >= 200 && status < 300) {
        return response;
      }

      // Client errors
      return this.handleError(response);
    }
  }

  private async handleError(response: Response): Promise<never> {
    const status = response.status;
    const body = await response.text();

    if (status === 400 || status === 422) {
      let fieldErrors: Record<string, string | string[]> = {};
      try {
        const payload = JSON.parse(body) as Record<string, unknown>;
        fieldErrors = (payload['violations'] ??
          payload['errors'] ??
          {}) as Record<string, string | string[]>;
      } catch {
        // Could not parse field errors
      }
      throw new ValidationError(`Validation error: ${body}`, status, fieldErrors);
    }

    if (status === 401) {
      throw new AuthenticationError();
    }

    if (status === 403) {
      throw new AuthorizationError();
    }

    if (status === 404) {
      throw new NotFoundError(`Resource not found: ${body}`);
    }

    throw new EssabuError(`Unexpected HTTP error ${status}: ${body}`, status);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
