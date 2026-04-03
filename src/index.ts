export { Essabu } from './client';
export default Essabu;

// Config
export type { EssabuConfig } from './config';

// Common
export {
  EssabuError,
  BadRequestError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  ConflictError,
  RateLimitError,
  ServerError,
  TimeoutError,
  NetworkError,
} from './common/exceptions';
export type { FieldViolation } from './common/exceptions';
export type {
  PageRequest,
  PageResponse,
  PageMeta,
  ApiResponse,
  BaseResource,
} from './common/models';

// Module clients
export { HrClient } from './hr/client';
export { AccountingClient } from './accounting/client';
export { IdentityClient } from './identity/client';
export { TradeClient } from './trade/client';
export { PaymentClient } from './payment/client';
export { EInvoiceClient } from './einvoice/client';
export { ProjectClient } from './project/client';
export { AssetClient } from './asset/client';
export { ComplianceClient } from './compliance/client';

// HR models
export type {
  Employee, CreateEmployeeRequest, UpdateEmployeeRequest,
  Contract, CreateContractRequest, UpdateContractRequest,
  Leave, CreateLeaveRequest, UpdateLeaveRequest, ApproveLeaveRequest, RejectLeaveRequest,
  PayrollRun, PaySlip, PaySlipLine, CreatePayrollRunRequest, ProcessPayrollRequest,
  Department, CreateDepartmentRequest, UpdateDepartmentRequest,
  Attendance, CreateAttendanceRequest, UpdateAttendanceRequest,
} from './hr';

// Accounting models
export type {
  Account, CreateAccountRequest, UpdateAccountRequest,
  JournalEntry, JournalEntryLine, CreateJournalEntryRequest, CreateJournalEntryLineRequest, UpdateJournalEntryRequest,
  FiscalYear, CreateFiscalYearRequest,
  Tax, CreateTaxRequest, UpdateTaxRequest,
  BalanceSheet, IncomeStatement, TrialBalance, TrialBalanceAccount, ReportSection, ReportLineItem, ReportPeriod,
} from './accounting';

// Identity models
export type {
  User, CreateUserRequest, UpdateUserRequest, ChangePasswordRequest,
  Tenant, CreateTenantRequest, UpdateTenantRequest,
  Role, CreateRoleRequest, UpdateRoleRequest, Permission,
  LoginRequest, LoginResponse, RefreshTokenRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest,
} from './identity';

// Trade models
export type {
  Customer, CreateCustomerRequest, UpdateCustomerRequest,
  Supplier, CreateSupplierRequest, UpdateSupplierRequest,
  Invoice, InvoiceLine, CreateInvoiceRequest, CreateInvoiceLineRequest, UpdateInvoiceRequest,
  PurchaseOrder, PurchaseOrderLine, CreatePurchaseOrderRequest, CreatePurchaseOrderLineRequest, UpdatePurchaseOrderRequest,
  Product, CreateProductRequest, UpdateProductRequest,
  Quotation, QuotationLine, CreateQuotationRequest, CreateQuotationLineRequest, UpdateQuotationRequest,
} from './trade';

// Payment models
export type {
  Payment, CreatePaymentRequest, UpdatePaymentRequest,
  BankAccount, CreateBankAccountRequest, UpdateBankAccountRequest,
  Transaction, ReconcileTransactionRequest,
} from './payment';

// E-Invoice models
export type {
  EInvoice, CreateEInvoiceRequest, EInvoiceValidationResult, EInvoiceValidationError, EInvoiceValidationWarning,
} from './einvoice';

// Project models
export type {
  Project, CreateProjectRequest, UpdateProjectRequest,
  ProjectTask, CreateProjectTaskRequest, UpdateProjectTaskRequest,
  Timesheet, CreateTimesheetRequest, UpdateTimesheetRequest,
} from './project';

// Asset models
export type {
  Asset, CreateAssetRequest, UpdateAssetRequest, DisposeAssetRequest,
  AssetCategory, CreateAssetCategoryRequest, UpdateAssetCategoryRequest,
  Depreciation, RunDepreciationRequest,
} from './asset';

// Compliance models
export type {
  Audit, CreateAuditRequest, UpdateAuditRequest,
  Policy, CreatePolicyRequest, UpdatePolicyRequest,
  Incident, CreateIncidentRequest, UpdateIncidentRequest,
} from './compliance';

// Re-export Essabu as named export for convenience
import { Essabu } from './client';
