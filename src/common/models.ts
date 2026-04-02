/**
 * Shared data models used across all Essabu SDK modules.
 */

/**
 * Pagination parameters for list operations.
 */
export interface PageRequest {
  /** Page number (default 1). */
  page?: number;

  /** Number of items per page (default 20). */
  perPage?: number;

  /** Field name to sort by. */
  sort?: string;

  /** Sort direction. */
  direction?: 'asc' | 'desc';
}

/**
 * Generic paginated response wrapper.
 */
export interface PageResponse<T = Record<string, unknown>> {
  /** The list of items in the current page. */
  data: T[];

  /** Current page number. */
  page: number;

  /** Number of items per page. */
  perPage: number;

  /** Total number of items across all pages. */
  totalElements: number;

  /** Total number of pages. */
  totalPages: number;
}

/**
 * Create a default PageRequest (page 1, perPage 20).
 */
export function firstPage(): PageRequest {
  return { page: 1, perPage: 20 };
}

/**
 * Create a PageRequest for a specific page and size.
 */
export function pageOf(page: number, perPage: number): PageRequest {
  return { page, perPage };
}

/**
 * Serialize a PageRequest to URL query string fragment.
 */
export function toQueryString(pr: PageRequest): string {
  const parts: string[] = [];
  if (pr.page !== undefined) parts.push(`page=${pr.page}`);
  if (pr.perPage !== undefined) parts.push(`perPage=${pr.perPage}`);
  if (pr.sort) {
    parts.push(`sort=${pr.sort}`);
    if (pr.direction) {
      parts.push(`direction=${pr.direction}`);
    }
  }
  return parts.join('&');
}

/**
 * Base interface for all API resource responses.
 */
export interface BaseResource {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

/**
 * Base interface for resources with status fields.
 */
export interface StatusResource extends BaseResource {
  status: string;
  statusLabel: string;
  statusColor: string;
}
