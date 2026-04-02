import type { BaseResource } from '../../common/models';

export interface Asset extends BaseResource {
  name: string;
  code?: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  currentValue: number;
  depreciationMethod: string;
  depreciationMethodLabel: string;
  usefulLifeMonths: number;
  salvageValue: number;
  currency: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  location?: string;
  assignedToId?: string;
  assignedToName?: string;
  serialNumber?: string;
  barcode?: string;
  disposedAt?: string;
  disposalPrice?: number;
}

export interface CreateAssetRequest {
  name: string;
  code?: string;
  description?: string;
  categoryId?: string;
  acquisitionDate: string;
  acquisitionCost: number;
  depreciationMethod?: string;
  usefulLifeMonths: number;
  salvageValue?: number;
  currency?: string;
  location?: string;
  assignedToId?: string;
  serialNumber?: string;
  barcode?: string;
}

export interface UpdateAssetRequest {
  name?: string;
  code?: string;
  description?: string;
  categoryId?: string;
  location?: string;
  assignedToId?: string;
  serialNumber?: string;
  barcode?: string;
}

export interface DisposeAssetRequest {
  disposalDate: string;
  disposalPrice: number;
  reason?: string;
}
