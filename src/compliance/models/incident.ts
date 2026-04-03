import type { BaseResource } from '../../common/models';

export interface Incident extends BaseResource {
  title: string;
  description?: string;
  severity?: string;
  severityLabel?: string;
  severityColor?: string;
  reportedById?: string;
  reportedByName?: string;
  assignedToId?: string;
  assignedToName?: string;
  resolvedAt?: string;
  resolution?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
}

export interface CreateIncidentRequest {
  title: string;
  description?: string;
  severity?: string;
  reportedById?: string;
  assignedToId?: string;
}

export interface UpdateIncidentRequest {
  title?: string;
  description?: string;
  severity?: string;
  assignedToId?: string;
  resolution?: string;
}
