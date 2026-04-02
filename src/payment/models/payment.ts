import type { BaseResource } from '../../common/models';

export interface Payment extends BaseResource {
  reference: string;
  type: string;
  typeLabel: string;
  amount: number;
  currency: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  method: string;
  methodLabel: string;
  customerId?: string;
  customerName?: string;
  supplierId?: string;
  supplierName?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  date: string;
  description?: string;
  bankAccountId?: string;
  bankAccountName?: string;
  transactionId?: string;
  processedAt?: string;
}

export interface CreatePaymentRequest {
  type: string;
  amount: number;
  currency?: string;
  method: string;
  customerId?: string;
  supplierId?: string;
  invoiceId?: string;
  date: string;
  description?: string;
  bankAccountId?: string;
}

export interface UpdatePaymentRequest {
  amount?: number;
  method?: string;
  date?: string;
  description?: string;
  bankAccountId?: string;
}
