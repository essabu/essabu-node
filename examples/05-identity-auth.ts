/**
 * Example 5: Identity - Authentication & User Management
 * Login, manage users, roles, and tenants.
 */
import Essabu from '@essabu/sdk';

async function main() {
  /**
   * Initialize the SDK client with API key and tenant ID. All subsequent API calls
   * will be authenticated and scoped to this tenant automatically.
   */
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  /**
   * Create a new user account with email, first name, last name, password, and role
   * assignments. Returns the created User object with a generated UUID and full name.
   * Throws a ValidationError if the email is already registered or required fields
   * are missing.
   */
  const user = await essabu.identity.users.create({
    email: 'admin@company.com',
    firstName: 'Admin',
    lastName: 'User',
    password: 'secure-password-123',
    roles: ['admin'],
  });
  console.log(`Created user: ${user.fullName} (${user.email})`);

  /**
   * Retrieve the currently authenticated user's profile without providing an ID.
   * Returns the full User object associated with the API key's session, including
   * name, email, and assigned roles.
   */
  const me = await essabu.identity.users.me();
  console.log(`Logged in as: ${me.fullName}`);

  /**
   * List all roles with pagination. Each role contains a name and an array of
   * permission strings that define what actions users with that role can perform.
   * Returns a PageResponse with the roles array and pagination metadata.
   */
  const { data: roles } = await essabu.identity.roles.list();
  for (const role of roles) {
    console.log(`Role: ${role.name} (${role.permissions.length} permissions)`);
  }

  /**
   * Retrieve the current tenant's profile associated with the API key. Returns
   * the Tenant object with name, plan, status, and status display properties.
   * Use this to verify the tenant context and display organization information.
   */
  const tenant = await essabu.identity.tenants.current();
  console.log(`Tenant: ${tenant.name} (${tenant.statusLabel})`);

  /**
   * Fetch all available permissions in the system. Returns an array of Permission
   * objects that can be assigned to roles. Useful for building role management
   * interfaces where administrators select permissions from the full list.
   */
  const permissions = await essabu.identity.roles.listPermissions();
  console.log(`Available permissions: ${permissions.length}`);
}

main().catch(console.error);
