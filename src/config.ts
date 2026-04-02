/**
 * Configuration interface for the Essabu SDK client.
 */
export interface EssabuConfig {
  /** API key for authentication */
  apiKey: string;

  /** Tenant identifier for multi-tenant routing */
  tenantId: string;

  /** Base URL of the Essabu API (default: https://api.essabu.com) */
  baseUrl?: string;

  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;

  /** Maximum number of retries on transient failures (default: 3) */
  maxRetries?: number;

  /** Custom headers to include in every request */
  headers?: Record<string, string>;

  /** API version header value (default: '2024-01-01') */
  apiVersion?: string;
}

export const DEFAULT_CONFIG = {
  baseUrl: 'https://api.essabu.com',
  timeout: 30_000,
  maxRetries: 3,
  apiVersion: '2024-01-01',
} as const;
