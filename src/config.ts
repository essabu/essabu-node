/**
 * Configuration settings for the Essabu SDK client.
 */
export interface EssabuConfig {
  /** API key for Bearer token authentication. */
  apiKey: string;

  /** Tenant identifier for multi-tenant isolation. */
  tenantId: string;

  /** Root URL of the Essabu API (default: "https://api.essabu.com"). */
  baseUrl?: string;

  /** Request timeout in milliseconds (default 30000). */
  timeout?: number;

  /** Number of automatic retries on 5xx errors (default 3). */
  maxRetries?: number;

  /** Environment shortcut. When set, overrides baseUrl. */
  environment?: 'production' | 'sandbox';
}

/**
 * Resolve the effective base URL from config.
 */
export function resolveBaseUrl(config: EssabuConfig): string {
  if (config.baseUrl) {
    return config.baseUrl.replace(/\/+$/, '');
  }
  if (config.environment === 'sandbox') {
    return 'https://sandbox-api.essabu.com';
  }
  return 'https://api.essabu.com';
}
