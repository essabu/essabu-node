import type { BaseResource } from '../../common/models';

export interface PurchaseOrder extends BaseResource {
  number: string;
  supplierId: string;
  supplierName: string;
  date: string;
  expectedDate?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  notes?: string;
  lines: PurchaseOrderLine[];
  approvedAt?: string;
  receivedAt?: string;
}

export interface PurchaseOrderLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxId?: string;
  taxRate?: number;
  taxAmount: number;
  total: number;
  productId?: string;
  productName?: string;
}

export interface CreatePurchaseOrderRequest {
  supplierId: string;
  date: string;
  expectedDate?: string;
  notes?: string;
  lines: CreatePurchaseOrderLineRequest[];
}

export interface CreatePurchaseOrderLineRequest {
  description: string;
  quantity: number;
  unitPrice: number;
  taxId?: string;
  productId?: string;
}

export interface UpdatePurchaseOrderRequest {
  date?: string;
  expectedDate?: string;
  notes?: string;
  lines?: CreatePurchaseOrderLineRequest[];
}
