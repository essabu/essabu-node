/**
 * Example 1: Getting Started
 * Basic initialization and first API call.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // List employees with pagination
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
