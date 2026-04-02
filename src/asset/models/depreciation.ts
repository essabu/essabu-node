import type { BaseResource } from '../../common/models';

export interface Depreciation extends BaseResource {
  assetId: string;
  assetName: string;
  period: string;
  amount: number;
  accumulatedAmount: number;
  bookValue: number;
  currency: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  postedAt?: string;
}

export interface RunDepreciationRequest {
  period: string;
  assetIds?: string[];
}
