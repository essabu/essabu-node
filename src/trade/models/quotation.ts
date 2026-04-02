import type { BaseResource } from '../../common/models';

export interface Quotation extends BaseResource {
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  expiryDate: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  currency: string;
  notes?: string;
  lines: QuotationLine[];
  acceptedAt?: string;
  convertedToInvoiceId?: string;
}

export interface QuotationLine {
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

export interface CreateQuotationRequest {
  customerId: string;
  date: string;
  expiryDate: string;
  notes?: string;
  lines: CreateQuotationLineRequest[];
}

export interface CreateQuotationLineRequest {
  description: string;
  quantity: number;
  unitPrice: number;
  taxId?: string;
  productId?: string;
}

export interface UpdateQuotationRequest {
  date?: string;
  expiryDate?: string;
  notes?: string;
  lines?: CreateQuotationLineRequest[];
}
