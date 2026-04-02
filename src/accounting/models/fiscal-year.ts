import type { BaseResource } from '../../common/models';

export interface FiscalYear extends BaseResource {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  isCurrent: boolean;
  closedAt?: string;
}

export interface CreateFiscalYearRequest {
  name: string;
  startDate: string;
  endDate: string;
}
