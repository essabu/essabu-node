/**
 * Identity module client. Provides access to authentication
 * and authorization API resources.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { AuthApi } from './api/auth';
import { UsersApi } from './api/users';
import { ProfilesApi } from './api/profiles';
import { CompaniesApi } from './api/companies';
import { TenantsApi } from './api/tenants';
import { RolesApi } from './api/roles';
import { PermissionsApi } from './api/permissions';
import { BranchesApi } from './api/branches';
import { ApiKeysApi } from './api/api-keys';
import { SessionsApi } from './api/sessions';

export class IdentityClient {
  private readonly http: HttpClient;

  private _auth?: AuthApi;
  private _users?: UsersApi;
  private _profiles?: ProfilesApi;
  private _companies?: CompaniesApi;
  private _tenants?: TenantsApi;
  private _roles?: RolesApi;
  private _permissions?: PermissionsApi;
  private _branches?: BranchesApi;
  private _apiKeys?: ApiKeysApi;
  private _sessions?: SessionsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/identity');
  }

  /** Set a bearer token (e.g. after login). */
  setToken(token: string): void {
    this.http.setToken(token);
  }

  /** Clear the bearer token. */
  clearToken(): void {
    this.http.clearToken();
  }

  get auth(): AuthApi {
    return (this._auth ??= new AuthApi(this.http));
  }

  get users(): UsersApi {
    return (this._users ??= new UsersApi(this.http));
  }

  get profiles(): ProfilesApi {
    return (this._profiles ??= new ProfilesApi(this.http));
  }

  get companies(): CompaniesApi {
    return (this._companies ??= new CompaniesApi(this.http));
  }

  get tenants(): TenantsApi {
    return (this._tenants ??= new TenantsApi(this.http));
  }

  get roles(): RolesApi {
    return (this._roles ??= new RolesApi(this.http));
  }

  get permissions(): PermissionsApi {
    return (this._permissions ??= new PermissionsApi(this.http));
  }

  get branches(): BranchesApi {
    return (this._branches ??= new BranchesApi(this.http));
  }

  get apiKeys(): ApiKeysApi {
    return (this._apiKeys ??= new ApiKeysApi(this.http));
  }

  get sessions(): SessionsApi {
    return (this._sessions ??= new SessionsApi(this.http));
  }
}
