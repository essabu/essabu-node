# Identity Module

Authentication, user management, roles, permissions, and multi-tenant configuration.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `AuthApi` | `/api/identity/auth` | Authentication (login, tokens, password reset) |
| `UsersApi` | `/api/identity/users` | User management |
| `RolesApi` | `/api/identity/roles` | Role-based access control |
| `TenantsApi` | `/api/identity/tenants` | Multi-tenant management |

## AuthApi

Handles authentication flows including login, token refresh, logout, and password management. The `login()` method authenticates with email and password, returning access and refresh tokens. The `refreshToken()` method exchanges a refresh token for new credentials. Password reset follows a two-step flow: `forgotPassword()` sends a reset email, then `resetPassword()` completes the reset with the received token. The `verifyEmail()` method confirms a user's email address.

```typescript
async login(data: LoginRequest): Promise<LoginResponse>
    // POST /api/identity/auth/login

async refreshToken(data: RefreshTokenRequest): Promise<LoginResponse>
    // POST /api/identity/auth/refresh

async logout(): Promise<void>
    // POST /api/identity/auth/logout

async forgotPassword(data: ForgotPasswordRequest): Promise<void>
    // POST /api/identity/auth/forgot-password

async resetPassword(data: ResetPasswordRequest): Promise<void>
    // POST /api/identity/auth/reset-password

async verifyEmail(data: VerifyEmailRequest): Promise<void>
    // POST /api/identity/auth/verify-email
```

## UsersApi

Manages user accounts with full CRUD operations and lifecycle actions. The `me()` method returns the currently authenticated user's profile without requiring an ID. The `changePassword()` method requires both the current and new passwords for security. The `activate()` and `deactivate()` methods toggle the user's account status, controlling their ability to log in.

```typescript
async list(params?: PageRequest): Promise<PageResponse<User>>
async retrieve(id: string): Promise<User>
async create(data: CreateUserRequest): Promise<User>
async update(id: string, data: UpdateUserRequest): Promise<User>
async remove(id: string): Promise<void>

async me(): Promise<User>
    // GET /api/identity/users/me

async changePassword(id: string, data: ChangePasswordRequest): Promise<void>
    // POST /api/identity/users/{id}/change-password

async activate(id: string): Promise<User>
    // POST /api/identity/users/{id}/activate

async deactivate(id: string): Promise<User>
    // POST /api/identity/users/{id}/deactivate
```

## RolesApi

Manages role-based access control with CRUD operations. Create roles with a name and a list of permission keys. The `listPermissions()` method returns all available permissions in the system, useful for building role management UIs. Roles are assigned to users to control their access across all modules.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Role>>
async retrieve(id: string): Promise<Role>
async create(data: CreateRoleRequest): Promise<Role>
async update(id: string, data: UpdateRoleRequest): Promise<Role>
async remove(id: string): Promise<void>

async listPermissions(): Promise<Permission[]>
    // GET /api/identity/permissions
```

## TenantsApi

Manages multi-tenant configuration with CRUD operations. Each tenant represents an isolated organization with its own data. The `current()` method returns the tenant associated with the current API key. Create new tenants for multi-organization deployments, and update tenant settings like name and plan.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Tenant>>
async retrieve(id: string): Promise<Tenant>
async create(data: CreateTenantRequest): Promise<Tenant>
async update(id: string, data: UpdateTenantRequest): Promise<Tenant>
async remove(id: string): Promise<void>

async current(): Promise<Tenant>
    // GET /api/identity/tenants/current
```

## Code Examples

### Authentication

Authenticate a user with email and password to receive access and refresh tokens. Use the refresh token to obtain new credentials when the access token expires. Initiate a password reset flow by sending a reset email, then complete it with the token received via email. Verify a user's email address with a verification token. Finally, call `logout()` to invalidate the current session.

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ baseUrl: 'https://api.essabu.com' });

// Login
const { accessToken, refreshToken } = await client.identity.auth.login({
  email: 'admin@company.com',
  password: 'secret',
});

// Refresh token
const newTokens = await client.identity.auth.refreshToken({ refreshToken });

// Password reset flow
await client.identity.auth.forgotPassword({ email: 'user@company.com' });
await client.identity.auth.resetPassword({ token: 'reset-token', password: 'new-password' });

// Email verification
await client.identity.auth.verifyEmail({ token: 'verification-token' });

// Logout
await client.identity.auth.logout();
```

### User Management

List users with pagination, retrieve the current user's profile with `me()`, and create new user accounts with email, name, and role assignment. Change a user's password by providing both the current and new passwords. Toggle user account status with `activate()` and `deactivate()` to control login access.

```typescript
const users = await client.identity.users.list({ page: 1, pageSize: 20 });
const me = await client.identity.users.me();

const user = await client.identity.users.create({
  email: 'new.user@company.com',
  firstName: 'Alice',
  lastName: 'Martin',
  roleId: 'role-uuid',
});

await client.identity.users.changePassword(user.id, {
  currentPassword: 'old',
  newPassword: 'new-secure-pwd',
});

await client.identity.users.activate(user.id);
await client.identity.users.deactivate(user.id);
```

### Roles and Permissions

Fetch all available permissions in the system, then create a new role with a name and a subset of those permissions. Roles are assigned to users and determine what API endpoints and actions they can access. Returns the created Role object with its UUID.

```typescript
const permissions = await client.identity.roles.listPermissions();
const role = await client.identity.roles.create({
  name: 'Accountant',
  permissions: ['accounting.read', 'accounting.write'],
});
```

### Tenants

Retrieve the current tenant's profile associated with the API key, or create a new tenant for multi-organization setups. The `current()` method returns the Tenant object with name, plan, and status details. The `create()` method provisions a new isolated tenant environment.

```typescript
const current = await client.identity.tenants.current();
const tenant = await client.identity.tenants.create({
  name: 'ACME Corp',
  plan: 'enterprise',
});
```
