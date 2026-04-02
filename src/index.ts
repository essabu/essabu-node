/**
 * @essabu/sdk - Official unified JavaScript/TypeScript SDK for the Essabu platform.
 *
 * @example
 * ```ts
 * import Essabu from '@essabu/sdk';
 *
 * const essabu = new Essabu({
 *   apiKey: 'your-api-key',
 *   tenantId: 'your-tenant-id',
 * });
 *
 * const employees = await essabu.hr.employees.list();
 * ```
 */

// Main client
import { Essabu } from './client';
export { Essabu } from './client';
export default Essabu;

// Config
export type { EssabuConfig } from './config';

// Common
export type { PageRequest, PageResponse, BaseResource, StatusResource } from './common/models';
export { firstPage, pageOf, toQueryString } from './common/models';
export {
  EssabuError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from './common/exceptions';

// Module clients (for standalone usage)
export { HrClient } from './hr/client';
export { AccountingClient } from './accounting/client';
export { IdentityClient } from './identity/client';
export { TradeClient } from './trade/client';
export { PaymentClient } from './payment/client';
export { EInvoiceClient } from './einvoice/client';
export { ProjectClient } from './project/client';
export { AssetClient } from './asset/client';
