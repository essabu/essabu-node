import type { HttpClientInterface } from '../common/models';
import { AuditApi } from './api/audit';
import { PolicyApi } from './api/policies';
import { IncidentApi } from './api/incidents';

/**
 * Compliance module client.
 */
export class ComplianceClient {
  private _audit?: AuditApi;
  private _policies?: PolicyApi;
  private _incidents?: IncidentApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get audit(): AuditApi {
    return (this._audit ??= new AuditApi(this.httpClient));
  }

  get policies(): PolicyApi {
    return (this._policies ??= new PolicyApi(this.httpClient));
  }

  get incidents(): IncidentApi {
    return (this._incidents ??= new IncidentApi(this.httpClient));
  }
}
