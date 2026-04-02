import type { HttpClientInterface } from '../common/models';
import { UsersApi } from './api/users';
import { TenantsApi } from './api/tenants';
import { RolesApi } from './api/roles';
import { AuthApi } from './api/auth';

/**
 * Identity module client.
 */
export class IdentityClient {
  private _users?: UsersApi;
  private _tenants?: TenantsApi;
  private _roles?: RolesApi;
  private _auth?: AuthApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get users(): UsersApi {
    return (this._users ??= new UsersApi(this.httpClient));
  }

  get tenants(): TenantsApi {
    return (this._tenants ??= new TenantsApi(this.httpClient));
  }

  get roles(): RolesApi {
    return (this._roles ??= new RolesApi(this.httpClient));
  }

  get auth(): AuthApi {
    return (this._auth ??= new AuthApi(this.httpClient));
  }
}
