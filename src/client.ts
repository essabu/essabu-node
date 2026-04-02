/**
 * Main entry point for the Essabu SDK.
 *
 * Provides a unified, Stripe-like interface to all Essabu platform modules.
 * Each module is lazily initialized on first access.
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
 * // HR
 * await essabu.hr.employees.create({ firstName: 'Jean', lastName: 'Mukendi' });
 * await essabu.hr.payrolls.calculate(payrollId);
 *
 * // Accounting
 * await essabu.accounting.invoices.create({ ... });
 *
 * // Identity
 * const token = await essabu.identity.auth.login('email', 'password');
 * ```
 */

import type { EssabuConfig } from './config';
import { resolveBaseUrl } from './config';
import { HrClient } from './hr/client';
import { AccountingClient } from './accounting/client';
import { IdentityClient } from './identity/client';
import { TradeClient } from './trade/client';
import { PaymentClient } from './payment/client';
import { EInvoiceClient } from './einvoice/client';
import { ProjectClient } from './project/client';
import { AssetClient } from './asset/client';

export class Essabu {
  private readonly config: EssabuConfig;

  private _hr?: HrClient;
  private _accounting?: AccountingClient;
  private _identity?: IdentityClient;
  private _trade?: TradeClient;
  private _payment?: PaymentClient;
  private _einvoice?: EInvoiceClient;
  private _project?: ProjectClient;
  private _asset?: AssetClient;

  constructor(config: EssabuConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }
    if (!config.tenantId) {
      throw new Error('tenantId is required');
    }

    this.config = {
      ...config,
      baseUrl: resolveBaseUrl(config),
    };
  }

  /** Human Resources module. */
  get hr(): HrClient {
    return (this._hr ??= new HrClient(this.config));
  }

  /** Accounting module. */
  get accounting(): AccountingClient {
    return (this._accounting ??= new AccountingClient(this.config));
  }

  /** Identity and authentication module. */
  get identity(): IdentityClient {
    return (this._identity ??= new IdentityClient(this.config));
  }

  /** Trade (CRM, sales, purchasing, inventory) module. */
  get trade(): TradeClient {
    return (this._trade ??= new TradeClient(this.config));
  }

  /** Payment processing module. */
  get payment(): PaymentClient {
    return (this._payment ??= new PaymentClient(this.config));
  }

  /** E-Invoicing module. */
  get einvoice(): EInvoiceClient {
    return (this._einvoice ??= new EInvoiceClient(this.config));
  }

  /** Project management module. */
  get project(): ProjectClient {
    return (this._project ??= new ProjectClient(this.config));
  }

  /** Asset management module. */
  get asset(): AssetClient {
    return (this._asset ??= new AssetClient(this.config));
  }
}
