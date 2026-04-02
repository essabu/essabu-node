// Invoice
export interface InvoiceParty {
  tin: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  taxAmount?: number;
  total?: number;
}

export interface NormalizeInvoiceRequest {
  supplier: InvoiceParty;
  customer: InvoiceParty;
  items: InvoiceItem[];
  invoiceNumber?: string;
  invoiceDate?: string;
  currency?: string;
  notes?: string;
}

export interface NormalizedInvoiceResponse {
  invoiceId: string;
  invoiceNumber: string;
  invoiceDate: string;
  supplier: InvoiceParty;
  customer: InvoiceParty;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  currency: string;
  normalizedAt: string;
  signature?: string;
}

// Submission
export interface SubmissionResponse {
  submissionId: string;
  invoiceId: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  submittedAt: string;
  message?: string;
}

export interface SubmissionStatusResponse {
  submissionId: string;
  invoiceId: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  submittedAt: string;
  updatedAt: string;
  message?: string;
  errors?: string[];
}

// Verification
export interface VerificationResponse {
  invoiceId: string;
  isValid: boolean;
  verifiedAt: string;
  details?: Record<string, unknown>;
  errors?: string[];
}

// Compliance
export interface ComplianceReportRequest {
  startDate: string;
  endDate: string;
  format?: string;
  filters?: Record<string, unknown>;
}

export interface ComplianceReportResponse {
  reportId: string;
  startDate: string;
  endDate: string;
  generatedAt: string;
  totalInvoices: number;
  compliantCount: number;
  nonCompliantCount: number;
  complianceRate: number;
  details?: Record<string, unknown>[];
  downloadUrl?: string;
}

// Statistics
export interface StatisticsRequest {
  startDate?: string;
  endDate?: string;
  groupBy?: string;
  filters?: Record<string, unknown>;
}

export interface StatisticsResponse {
  totalInvoices: number;
  totalAmount: number;
  totalTax: number;
  submittedCount: number;
  acceptedCount: number;
  rejectedCount: number;
  pendingCount: number;
  currency: string;
  periodStart?: string;
  periodEnd?: string;
  breakdown?: Record<string, unknown>[];
}
