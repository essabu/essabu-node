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

```typescript
const permissions = await client.identity.roles.listPermissions();
const role = await client.identity.roles.create({
  name: 'Accountant',
  permissions: ['accounting.read', 'accounting.write'],
});
```

### Tenants

```typescript
const current = await client.identity.tenants.current();
const tenant = await client.identity.tenants.create({
  name: 'ACME Corp',
  plan: 'enterprise',
});
```
