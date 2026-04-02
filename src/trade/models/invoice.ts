import type { BaseResource } from '../../common/models';

export interface Invoice extends BaseResource {
  number: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  subtotal: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  notes?: string;
  lines: InvoiceLine[];
  issuedAt?: string;
  paidAt?: string;
}

export interface InvoiceLine {
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

export interface CreateInvoiceRequest {
  customerId: string;
  date: string;
  dueDate: string;
  notes?: string;
  lines: CreateInvoiceLineRequest[];
}

export interface CreateInvoiceLineRequest {
  description: string;
  quantity: number;
  unitPrice: number;
  taxId?: string;
  productId?: string;
}

export interface UpdateInvoiceRequest {
  date?: string;
  dueDate?: string;
  notes?: string;
  lines?: CreateInvoiceLineRequest[];
}
