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
  /**
   * Initialize the SDK client with API key and tenant ID. All subsequent API calls
   * will be authenticated and scoped to this tenant automatically.
   */
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  /**
   * Wrap API calls in a try/catch block and use instanceof checks to handle specific
   * error types. NotFoundError (404) indicates the resource does not exist.
   * AuthenticationError (401) means the API key is invalid or expired.
   * ValidationError (422) provides a violations array with field-level error details.
   * RateLimitError (429) includes a retryAfter value in seconds. The base EssabuError
   * catches all other API errors with statusCode, code, and optional requestId.
   */
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

  /**
   * Demonstrate handling a ValidationError when creating a resource with invalid data.
   * Sending empty required fields and an invalid email triggers a 422 response. The
   * ValidationError's violations array contains one entry per invalid field, each with
   * the field name and a human-readable error message describing what went wrong.
   */
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
