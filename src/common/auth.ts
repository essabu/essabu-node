/**
 * Authentication handler for outgoing HTTP requests.
 */

import type { EssabuConfig } from '../config';

export class AuthHandler {
  private readonly apiKey: string;
  private readonly tenantId: string;
  private token: string | undefined;

  constructor(config: EssabuConfig) {
    this.apiKey = config.apiKey;
    this.tenantId = config.tenantId;
    this.token = undefined;
  }

  /** Set a bearer token (e.g. after login). */
  setToken(token: string): void {
    this.token = token;
  }

  /** Clear the bearer token. */
  clearToken(): void {
    this.token = undefined;
  }

  /** Return authentication headers as a plain object. */
  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'X-Tenant-Id': this.tenantId,
      Accept: 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    } else {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }
}
