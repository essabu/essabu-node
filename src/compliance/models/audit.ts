import type { BaseResource } from '../../common/models';

export interface Audit extends BaseResource {
  action: string;
  entityType: string;
  entityId: string;
  userId?: string;
  userName?: string;
  ipAddress?: string;
  userAgent?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  description?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
}

export interface CreateAuditRequest {
  action: string;
  entityType: string;
  entityId: string;
  userId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
  description?: string;
}

export interface UpdateAuditRequest {
  description?: string;
}
