/**
 * Example 8: Error Handling
 * Demonstrate proper error handling patterns.
 */
import Essabu, {
  EssabuError,
  NotFoundError,
  ValidationError,
  AuthenticationError,
  RateLimitError,
} from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Handle specific error types
  try {
    await essabu.hr.employees.retrieve('non-existent-id');
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.log(`Employee not found (${error.statusCode}): ${error.message}`);
    } else if (error instanceof AuthenticationError) {
      console.log('Authentication failed - check your API key');
    } else if (error instanceof ValidationError) {
      console.log('Validation errors:');
      for (const v of error.violations) {
        console.log(`  - ${v.field}: ${v.message}`);
      }
    } else if (error instanceof RateLimitError) {
      console.log(`Rate limited. Retry after: ${error.retryAfter}s`);
    } else if (error instanceof EssabuError) {
      console.log(`API error [${error.code}]: ${error.message}`);
      if (error.requestId) {
        console.log(`Request ID: ${error.requestId}`);
      }
    } else {
      throw error;
    }
  }

  // Validation error example
  try {
    await essabu.hr.employees.create({
      firstName: '',  // Will fail validation
      lastName: '',
      email: 'invalid-email',
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`\nValidation failed (${error.violations.length} errors):`);
      for (const v of error.violations) {
        console.log(`  ${v.field}: ${v.message}`);
      }
    }
  }
}

main().catch(console.error);
