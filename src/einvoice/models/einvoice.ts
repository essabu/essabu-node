import type { BaseResource } from '../../common/models';

export interface EInvoice extends BaseResource {
  invoiceId: string;
  invoiceNumber: string;
  format: string;
  formatLabel: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  xml?: string;
  pdf?: string;
  hash?: string;
  submittedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  externalId?: string;
  provider: string;
}

export interface CreateEInvoiceRequest {
  invoiceId: string;
  format?: string;
}

export interface EInvoiceValidationResult {
  isValid: boolean;
  errors: EInvoiceValidationError[];
  warnings: EInvoiceValidationWarning[];
}

export interface EInvoiceValidationError {
  code: string;
  message: string;
  path?: string;
}

export interface EInvoiceValidationWarning {
  code: string;
  message: string;
  path?: string;
}
