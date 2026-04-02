import type { BaseResource } from '../../common/models';

export interface Tenant extends BaseResource {
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  plan?: string;
  settings?: Record<string, unknown>;
  ownerId: string;
  ownerName: string;
}

export interface CreateTenantRequest {
  name: string;
  slug?: string;
  domain?: string;
  plan?: string;
}

export interface UpdateTenantRequest {
  name?: string;
  domain?: string;
  logo?: string;
  settings?: Record<string, unknown>;
}
