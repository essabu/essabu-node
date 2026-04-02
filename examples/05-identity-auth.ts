/**
 * Example 5: Identity - Authentication & User Management
 * Login, manage users, roles, and tenants.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a user
  const user = await essabu.identity.users.create({
    email: 'admin@company.com',
    firstName: 'Admin',
    lastName: 'User',
    password: 'secure-password-123',
    roles: ['admin'],
  });
  console.log(`Created user: ${user.fullName} (${user.email})`);

  // Get current user
  const me = await essabu.identity.users.me();
  console.log(`Logged in as: ${me.fullName}`);

  // List roles
  const { data: roles } = await essabu.identity.roles.list();
  for (const role of roles) {
    console.log(`Role: ${role.name} (${role.permissions.length} permissions)`);
  }

  // Get current tenant
  const tenant = await essabu.identity.tenants.current();
  console.log(`Tenant: ${tenant.name} (${tenant.statusLabel})`);

  // List all permissions
  const permissions = await essabu.identity.roles.listPermissions();
  console.log(`Available permissions: ${permissions.length}`);
}

main().catch(console.error);
