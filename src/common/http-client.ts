import type { EssabuConfig } from '../config';
import { DEFAULT_CONFIG } from '../config';
import { buildAuthHeaders } from './auth';
import {
  AuthenticationError,
  BadRequestError,
  ConflictError,
  EssabuError,
  ForbiddenError,
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  TimeoutError,
  ValidationError,
} from './exceptions';
import type { HttpClientInterface, RequestOptions } from './models';

interface ErrorResponseBody {
  message?: string;
  code?: string;
  violations?: Array<{ field: string; message: string; code?: string }>;
  requestId?: string;
}

/**
 * HTTP client using native fetch (Node 18+).
 * Handles authentication, retries with exponential backoff, and error mapping.
 */
export class HttpClient implements HttpClientInterface {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: EssabuConfig) {
    this.baseUrl = (config.baseUrl ?? DEFAULT_CONFIG.baseUrl).replace(/\/$/, '');
    this.timeout = config.timeout ?? DEFAULT_CONFIG.timeout;
    this.maxRetries = config.maxRetries ?? DEFAULT_CONFIG.maxRetries;

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': '@essabu/sdk-node/1.0.0',
      ...buildAuthHeaders(config),
      ...config.headers,
    };
  }

  async request<T>(options: RequestOptions): Promise<T> {
    const url = this.buildUrl(options.path, options.query);
    const headers = { ...this.defaultHeaders, ...options.headers };

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (options.body !== undefined && options.method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    return this.executeWithRetry<T>(url, fetchOptions, 0);
  }

  private async executeWithRetry<T>(
    url: string,
    options: RequestInit,
    attempt: number,
  ): Promise<T> {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        // Handle 204 No Content
        if (response.status === 204) {
          return undefined as T;
        }
        return (await response.json()) as T;
      }

      // Parse error body
      const errorBody = await this.parseErrorBody(response);
      const requestId = response.headers.get('x-request-id') ?? errorBody.requestId;

      // Retry on 429 and 5xx
      if (this.isRetryable(response.status) && attempt < this.maxRetries) {
        const retryAfter = this.getRetryDelay(response, attempt);
        await this.sleep(retryAfter);
        return this.executeWithRetry<T>(url, options, attempt + 1);
      }

      throw this.mapError(response.status, errorBody, requestId);
    } catch (error) {
      if (error instanceof EssabuError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new TimeoutError();
      }

      if (error instanceof TypeError) {
        // Network errors from fetch
        if (attempt < this.maxRetries) {
          const delay = this.calculateBackoff(attempt);
          await this.sleep(delay);
          return this.executeWithRetry<T>(url, options, attempt + 1);
        }
        throw new NetworkError(error.message);
      }

      throw error;
    }
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
  ): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${normalizedPath}`);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private async parseErrorBody(response: Response): Promise<ErrorResponseBody> {
    try {
      return (await response.json()) as ErrorResponseBody;
    } catch {
      return { message: response.statusText };
    }
  }

  private mapError(
    statusCode: number,
    body: ErrorResponseBody,
    requestId?: string,
  ): EssabuError {
    const message = body.message ?? 'Unknown error';

    switch (statusCode) {
      case 400:
        return new BadRequestError(message, requestId);
      case 401:
        return new AuthenticationError(message, requestId);
      case 403:
        return new ForbiddenError(message, requestId);
      case 404:
        return new NotFoundError(message, requestId);
      case 409:
        return new ConflictError(message, requestId);
      case 422:
        return new ValidationError(message, body.violations ?? [], requestId);
      case 429:
        return new RateLimitError(message, undefined, requestId);
      default:
        if (statusCode >= 500) {
          return new ServerError(message, statusCode, requestId);
        }
        return new EssabuError(message, statusCode, body.code ?? 'unknown', requestId);
    }
  }

  private isRetryable(statusCode: number): boolean {
    return statusCode === 429 || statusCode >= 500;
  }

  private getRetryDelay(response: Response, attempt: number): number {
    const retryAfter = response.headers.get('retry-after');
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds)) {
        return seconds * 1000;
      }
    }
    return this.calculateBackoff(attempt);
  }

  private calculateBackoff(attempt: number): number {
    const baseDelay = 500;
    const maxDelay = 30_000;
    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    // Add jitter (0-25% of delay)
    return delay + Math.random() * delay * 0.25;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
