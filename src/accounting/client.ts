import type { HttpClientInterface } from '../common/models';
import { AccountsApi } from './api/accounts';
import { JournalEntriesApi } from './api/journal-entries';
import { FiscalYearsApi } from './api/fiscal-years';
import { TaxesApi } from './api/taxes';
import { ReportsApi } from './api/reports';

/**
 * Accounting module client.
 */
export class AccountingClient {
  private _accounts?: AccountsApi;
  private _journalEntries?: JournalEntriesApi;
  private _fiscalYears?: FiscalYearsApi;
  private _taxes?: TaxesApi;
  private _reports?: ReportsApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get accounts(): AccountsApi {
    return (this._accounts ??= new AccountsApi(this.httpClient));
  }

  get journalEntries(): JournalEntriesApi {
    return (this._journalEntries ??= new JournalEntriesApi(this.httpClient));
  }

  get fiscalYears(): FiscalYearsApi {
    return (this._fiscalYears ??= new FiscalYearsApi(this.httpClient));
  }

  get taxes(): TaxesApi {
    return (this._taxes ??= new TaxesApi(this.httpClient));
  }

  get reports(): ReportsApi {
    return (this._reports ??= new ReportsApi(this.httpClient));
  }
}
