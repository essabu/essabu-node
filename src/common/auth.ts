import type { EssabuConfig } from '../config';

/**
 * Builds authentication and tenant headers from config.
 */
export function buildAuthHeaders(config: EssabuConfig): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    'X-Tenant-Id': config.tenantId,
  };

  if (config.apiVersion) {
    headers['X-Api-Version'] = config.apiVersion;
  }

  return headers;
}
