import type { BaseResource } from '../../common/models';

export interface Policy extends BaseResource {
  name: string;
  code?: string;
  description?: string;
  category?: string;
  version?: string;
  effectiveDate?: string;
  expirationDate?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
}

export interface CreatePolicyRequest {
  name: string;
  code?: string;
  description?: string;
  category?: string;
  version?: string;
  effectiveDate?: string;
  expirationDate?: string;
}

export interface UpdatePolicyRequest {
  name?: string;
  code?: string;
  description?: string;
  category?: string;
  version?: string;
  effectiveDate?: string;
  expirationDate?: string;
}
