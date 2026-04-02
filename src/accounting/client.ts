/**
 * Accounting module client. Provides access to chart of accounts,
 * invoicing, journals, finance, inventory, and commercial API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';

// Core
import { AccountsApi } from './api/accounts';
import { BalancesApi } from './api/balances';

// Transactions
import { InvoicesApi } from './api/invoices';
import { QuotesApi } from './api/quotes';
import { JournalsApi } from './api/journals';
import { PaymentsApi } from './api/payments';
import { CreditNotesApi } from './api/credit-notes';
import { JournalEntriesApi } from './api/journal-entries';
import { PaymentTermsApi } from './api/payment-terms';

// Finance
import { FiscalYearsApi } from './api/fiscal-years';
import { PeriodsApi } from './api/periods';
import { CurrenciesApi } from './api/currencies';
import { TaxRatesApi } from './api/tax-rates';
import { ExchangeRatesApi } from './api/exchange-rates';
import { ExchangeRateProvidersApi } from './api/exchange-rate-providers';
import { WalletsApi } from './api/wallets';
import { WalletTransactionsApi } from './api/wallet-transactions';
import { ReportsApi } from './api/reports';

// Inventory
import { InventoryItemsApi } from './api/inventory-items';
import { PurchaseOrdersApi } from './api/purchase-orders';
import { SuppliersApi } from './api/suppliers';
import { StockLocationsApi } from './api/stock-locations';
import { StockCountsApi } from './api/stock-counts';
import { StockMovementsApi } from './api/stock-movements';
import { BatchesApi } from './api/batches';

// Commercial
import { PriceListsApi } from './api/price-lists';
import { PriceListOverridesApi } from './api/price-list-overrides';
import { InsurancePartnersApi } from './api/insurance-partners';
import { InsuranceContractsApi } from './api/insurance-contracts';
import { InsuranceClaimsApi } from './api/insurance-claims';

// Config & Webhooks
import { ConfigApi } from './api/config';
import { WebhooksApi } from './api/webhooks';

export class AccountingClient {
  private readonly http: HttpClient;

  // Core
  private _accounts?: AccountsApi;
  private _balances?: BalancesApi;

  // Transactions
  private _invoices?: InvoicesApi;
  private _quotes?: QuotesApi;
  private _journals?: JournalsApi;
  private _payments?: PaymentsApi;
  private _creditNotes?: CreditNotesApi;
  private _journalEntries?: JournalEntriesApi;
  private _paymentTerms?: PaymentTermsApi;

  // Finance
  private _fiscalYears?: FiscalYearsApi;
  private _periods?: PeriodsApi;
  private _currencies?: CurrenciesApi;
  private _taxRates?: TaxRatesApi;
  private _exchangeRates?: ExchangeRatesApi;
  private _exchangeRateProviders?: ExchangeRateProvidersApi;
  private _wallets?: WalletsApi;
  private _walletTransactions?: WalletTransactionsApi;
  private _reports?: ReportsApi;

  // Inventory
  private _inventoryItems?: InventoryItemsApi;
  private _purchaseOrders?: PurchaseOrdersApi;
  private _suppliers?: SuppliersApi;
  private _stockLocations?: StockLocationsApi;
  private _stockCounts?: StockCountsApi;
  private _stockMovements?: StockMovementsApi;
  private _batches?: BatchesApi;

  // Commercial
  private _priceLists?: PriceListsApi;
  private _priceListOverrides?: PriceListOverridesApi;
  private _insurancePartners?: InsurancePartnersApi;
  private _insuranceContracts?: InsuranceContractsApi;
  private _insuranceClaims?: InsuranceClaimsApi;

  // Config & Webhooks
  private _config?: ConfigApi;
  private _webhooks?: WebhooksApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/accounting');
  }

  // Core
  get accounts(): AccountsApi {
    return (this._accounts ??= new AccountsApi(this.http));
  }

  get balances(): BalancesApi {
    return (this._balances ??= new BalancesApi(this.http));
  }

  // Transactions
  get invoices(): InvoicesApi {
    return (this._invoices ??= new InvoicesApi(this.http));
  }

  get quotes(): QuotesApi {
    return (this._quotes ??= new QuotesApi(this.http));
  }

  get journals(): JournalsApi {
    return (this._journals ??= new JournalsApi(this.http));
  }

  get payments(): PaymentsApi {
    return (this._payments ??= new PaymentsApi(this.http));
  }

  get creditNotes(): CreditNotesApi {
    return (this._creditNotes ??= new CreditNotesApi(this.http));
  }

  get journalEntries(): JournalEntriesApi {
    return (this._journalEntries ??= new JournalEntriesApi(this.http));
  }

  get paymentTerms(): PaymentTermsApi {
    return (this._paymentTerms ??= new PaymentTermsApi(this.http));
  }

  // Finance
  get fiscalYears(): FiscalYearsApi {
    return (this._fiscalYears ??= new FiscalYearsApi(this.http));
  }

  get periods(): PeriodsApi {
    return (this._periods ??= new PeriodsApi(this.http));
  }

  get currencies(): CurrenciesApi {
    return (this._currencies ??= new CurrenciesApi(this.http));
  }

  get taxRates(): TaxRatesApi {
    return (this._taxRates ??= new TaxRatesApi(this.http));
  }

  get exchangeRates(): ExchangeRatesApi {
    return (this._exchangeRates ??= new ExchangeRatesApi(this.http));
  }

  get exchangeRateProviders(): ExchangeRateProvidersApi {
    return (this._exchangeRateProviders ??= new ExchangeRateProvidersApi(this.http));
  }

  get wallets(): WalletsApi {
    return (this._wallets ??= new WalletsApi(this.http));
  }

  get walletTransactions(): WalletTransactionsApi {
    return (this._walletTransactions ??= new WalletTransactionsApi(this.http));
  }

  get reports(): ReportsApi {
    return (this._reports ??= new ReportsApi(this.http));
  }

  // Inventory
  get inventoryItems(): InventoryItemsApi {
    return (this._inventoryItems ??= new InventoryItemsApi(this.http));
  }

  get purchaseOrders(): PurchaseOrdersApi {
    return (this._purchaseOrders ??= new PurchaseOrdersApi(this.http));
  }

  get suppliers(): SuppliersApi {
    return (this._suppliers ??= new SuppliersApi(this.http));
  }

  get stockLocations(): StockLocationsApi {
    return (this._stockLocations ??= new StockLocationsApi(this.http));
  }

  get stockCounts(): StockCountsApi {
    return (this._stockCounts ??= new StockCountsApi(this.http));
  }

  get stockMovements(): StockMovementsApi {
    return (this._stockMovements ??= new StockMovementsApi(this.http));
  }

  get batches(): BatchesApi {
    return (this._batches ??= new BatchesApi(this.http));
  }

  // Commercial
  get priceLists(): PriceListsApi {
    return (this._priceLists ??= new PriceListsApi(this.http));
  }

  get priceListOverrides(): PriceListOverridesApi {
    return (this._priceListOverrides ??= new PriceListOverridesApi(this.http));
  }

  get insurancePartners(): InsurancePartnersApi {
    return (this._insurancePartners ??= new InsurancePartnersApi(this.http));
  }

  get insuranceContracts(): InsuranceContractsApi {
    return (this._insuranceContracts ??= new InsuranceContractsApi(this.http));
  }

  get insuranceClaims(): InsuranceClaimsApi {
    return (this._insuranceClaims ??= new InsuranceClaimsApi(this.http));
  }

  // Config & Webhooks
  get config(): ConfigApi {
    return (this._config ??= new ConfigApi(this.http));
  }

  get webhooks(): WebhooksApi {
    return (this._webhooks ??= new WebhooksApi(this.http));
  }
}
