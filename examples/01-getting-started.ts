/**
 * Example 1: Getting Started
 * Basic initialization and first API call.
 */
import Essabu from '@essabu/sdk';

async function main() {
  /**
   * Initialize the SDK client with your API key and tenant ID from environment variables.
   * These two parameters are required for all API calls. The client handles authentication,
   * retries, and request formatting automatically.
   */
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  /**
   * Retrieve a paginated list of employees for the current tenant. Accepts optional page
   * number and page size parameters. Returns a PageResponse containing the employee list
   * in `data` and pagination metadata in `meta` including total count and page navigation.
   */
  const { data: employees, meta } = await essabu.hr.employees.list({
    page: 1,
    pageSize: 10,
  });

  console.log(`Found ${meta.totalItems} employees (page ${meta.currentPage}/${meta.totalPages})`);

  for (const emp of employees) {
    console.log(`- ${emp.firstName} ${emp.lastName} (${emp.statusLabel})`);
  }
}

main().catch(console.error);
