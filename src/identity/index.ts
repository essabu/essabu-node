export { IdentityClient } from './client';

export { AuthApi } from './api/auth';
export { UsersApi } from './api/users';
export { ProfilesApi } from './api/profiles';
export { CompaniesApi } from './api/companies';
export { TenantsApi } from './api/tenants';
export { RolesApi } from './api/roles';
export { PermissionsApi } from './api/permissions';
export { BranchesApi } from './api/branches';
export { ApiKeysApi } from './api/api-keys';
export { SessionsApi } from './api/sessions';

export type {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  TwoFactorResponse,
  UserResponse,
  ProfileResponse,
  CompanyResponse,
  TenantResponse,
  RoleResponse,
  PermissionResponse,
  BranchResponse,
  ApiKeyResponse,
  SessionResponse,
} from './models';
