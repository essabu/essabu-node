import type { EssabuConfig } from './config';
import { DEFAULT_CONFIG } from './config';
import { HttpClient } from './common/http-client';
import { HrClient } from './hr/client';
import { AccountingClient } from './accounting/client';
import { IdentityClient } from './identity/client';
import { TradeClient } from './trade/client';
import { PaymentClient } from './payment/client';
import { EInvoiceClient } from './einvoice/client';
import { ProjectClient } from './project/client';
import { AssetClient } from './asset/client';
import { ComplianceClient } from './compliance/client';

/**
 * Essabu unified SDK client.
 *
 * Provides a API for accessing all Essabu platform modules.
 *
 * @example
 * ```typescript
 * import Essabu from '@essabu/sdk';
 *
 * const essabu = new Essabu({
 *   apiKey: 'your-api-key',
 *   tenantId: 'your-tenant-id',
 * });
 *
 * // Access modules
 * const employees = await essabu.hr.employees.list();
 * const invoices = await essabu.trade.invoices.list();
 * ```
 */
export class Essabu {
  private readonly httpClient: HttpClient;
  private readonly resolvedConfig: EssabuConfig;

  // Lazy module accessors
  private _hr?: HrClient;
  private _accounting?: AccountingClient;
  private _identity?: IdentityClient;
  private _trade?: TradeClient;
  private _payment?: PaymentClient;
  private _einvoice?: EInvoiceClient;
  private _project?: ProjectClient;
  private _asset?: AssetClient;
  private _compliance?: ComplianceClient;

  constructor(config: EssabuConfig) {
    if (!config.apiKey) {
      throw new Error('Essabu SDK: apiKey is required');
    }
    if (!config.tenantId) {
      throw new Error('Essabu SDK: tenantId is required');
    }

    this.resolvedConfig = {
      ...config,
      baseUrl: config.baseUrl ?? DEFAULT_CONFIG.baseUrl,
      timeout: config.timeout ?? DEFAULT_CONFIG.timeout,
      maxRetries: config.maxRetries ?? DEFAULT_CONFIG.maxRetries,
      apiVersion: config.apiVersion ?? DEFAULT_CONFIG.apiVersion,
    };

    this.httpClient = new HttpClient(this.resolvedConfig);
  }

  /** Human Resources module */
  get hr(): HrClient {
    return (this._hr ??= new HrClient(this.httpClient));
  }

  /** Accounting module */
  get accounting(): AccountingClient {
    return (this._accounting ??= new AccountingClient(this.httpClient));
  }

  /** Identity & Access Management module */
  get identity(): IdentityClient {
    return (this._identity ??= new IdentityClient(this.httpClient));
  }

  /** Trade (Sales & Purchasing) module */
  get trade(): TradeClient {
    return (this._trade ??= new TradeClient(this.httpClient));
  }

  /** Payment & Banking module */
  get payment(): PaymentClient {
    return (this._payment ??= new PaymentClient(this.httpClient));
  }

  /** Electronic Invoicing module */
  get einvoice(): EInvoiceClient {
    return (this._einvoice ??= new EInvoiceClient(this.httpClient));
  }

  /** Project Management module */
  get project(): ProjectClient {
    return (this._project ??= new ProjectClient(this.httpClient));
  }

  /** Asset Management module */
  get asset(): AssetClient {
    return (this._asset ??= new AssetClient(this.httpClient));
  }

  /** Compliance module */
  get compliance(): ComplianceClient {
    return (this._compliance ??= new ComplianceClient(this.httpClient));
  }
}
