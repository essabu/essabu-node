/**
 * Example: Authentication and token management.
 *
 * This demonstrates login, token refresh, session management,
 * and role-based access patterns with the Identity module.
 *
 * Run: npx tsx examples/authentication.ts
 */

import Essabu, { AuthenticationError, AuthorizationError, EssabuError } from '@essabu/sdk';

async function main() {
  // 1. Initialize the SDK with API key (for server-to-server calls)
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 2. Login with email and password
    console.log('Logging in...');
    const tokens = await essabu.identity.auth.login(
      'admin@example.com',
      'secure-password-123',
    );

    console.log('Login successful!');
    console.log(`  Access token: ${tokens.accessToken.slice(0, 20)}...`);
    console.log(`  Token type: ${tokens.tokenType}`);
    console.log(`  Expires in: ${tokens.expiresIn} seconds`);

    // 3. Store tokens for subsequent requests
    // In a real application, store these securely (e.g., httpOnly cookies)
    const accessToken = tokens.accessToken;
    const refreshToken = tokens.refreshToken;

    // 4. Fetch current user profile
    console.log('\nFetching user profile...');
    const profile = await essabu.identity.profiles.list({ page: 1, perPage: 1 });
    console.log('Profile:', profile.data[0]);

    // 5. List available roles
    console.log('\nListing roles...');
    const roles = await essabu.identity.roles.list({ page: 1, perPage: 10 });
    console.log(`Found ${roles.totalElements} roles`);

    for (const role of roles.data) {
      console.log(`  - ${role['name']}: ${role['description'] ?? 'No description'}`);
    }

    // 6. List permissions
    console.log('\nListing permissions...');
    const permissions = await essabu.identity.permissions.list({ page: 1, perPage: 20 });
    console.log(`Found ${permissions.totalElements} permissions`);

    // 7. Manage API keys
    console.log('\nListing API keys...');
    const apiKeys = await essabu.identity.apiKeys.list({ page: 1, perPage: 10 });
    console.log(`Found ${apiKeys.totalElements} API keys`);

    for (const key of apiKeys.data) {
      console.log(`  - ${key['name']} (${key['prefix']}...) | ${key['statusLabel']}`);
    }

    // 8. List active sessions
    console.log('\nListing sessions...');
    const sessions = await essabu.identity.sessions.list({ page: 1, perPage: 10 });
    console.log(`Found ${sessions.totalElements} active sessions`);

    // 9. Refresh the token before it expires
    console.log('\nRefreshing token...');
    const newTokens = await essabu.identity.auth.refresh(refreshToken);
    console.log('Token refreshed successfully!');
    console.log(`  New access token: ${newTokens.accessToken.slice(0, 20)}...`);

    // 10. Enable two-factor authentication
    console.log('\nEnabling 2FA...');
    const twoFactor = await essabu.identity.auth.enable2fa();
    console.log('2FA enabled!');
    console.log(`  QR Code URL: ${twoFactor.qrCodeUrl}`);
    if (twoFactor.recoveryCodes) {
      console.log(`  Recovery codes: ${twoFactor.recoveryCodes.length} codes generated`);
    }

    // 11. Logout
    console.log('\nLogging out...');
    await essabu.identity.auth.logout();
    console.log('Logged out successfully!');
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed: invalid credentials or expired token');
      console.error('  Please check your email/password or refresh your token');
    } else if (error instanceof AuthorizationError) {
      console.error('Access denied: insufficient permissions');
      console.error('  Contact your administrator to request access');
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
