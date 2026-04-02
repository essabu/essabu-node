export { EInvoiceClient } from './client';

export { InvoicesApi } from './api/invoices';
export { SubmissionsApi } from './api/submissions';
export { VerificationApi } from './api/verification';
export { ComplianceApi } from './api/compliance';
export { StatisticsApi } from './api/statistics';

export type {
  InvoiceParty,
  InvoiceItem,
  NormalizeInvoiceRequest,
  NormalizedInvoiceResponse,
  SubmissionResponse,
  SubmissionStatusResponse,
  VerificationResponse,
  ComplianceReportRequest,
  ComplianceReportResponse,
  StatisticsRequest,
  StatisticsResponse,
} from './models';
