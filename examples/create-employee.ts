/**
 * Example: Create an employee using the HR module.
 *
 * This demonstrates how to initialize the SDK, create an employee,
 * assign them to a department, and retrieve their profile.
 *
 * Run: npx tsx examples/create-employee.ts
 */

import Essabu, { ValidationError, EssabuError } from '@essabu/sdk';

async function main() {
  // 1. Initialize the SDK
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 2. Create a new employee
    console.log('Creating employee...');
    const employee = await essabu.hr.employees.create({
      firstName: 'Jean',
      lastName: 'Mukendi',
      email: 'jean.mukendi@example.com',
      phone: '+243810000000',
      departmentId: 'dept_engineering',
      positionId: 'pos_senior_dev',
      hireDate: '2024-03-15',
      salary: 2500,
      currency: 'USD',
    });

    console.log('Employee created:', employee);
    const employeeId = employee['id'] as string;

    // 3. Retrieve the employee
    console.log('\nFetching employee details...');
    const fetched = await essabu.hr.employees.get(employeeId);
    console.log('Employee details:', fetched);

    // 4. Update the employee
    console.log('\nUpdating employee...');
    const updated = await essabu.hr.employees.update(employeeId, {
      phone: '+243820000000',
    });
    console.log('Employee updated:', updated);

    // 5. List all employees with pagination
    console.log('\nListing employees (page 1, 10 per page)...');
    const employees = await essabu.hr.employees.list({ page: 1, perPage: 10 });
    console.log(`Found ${employees.totalElements} employees`);
    console.log(`Page ${employees.page}/${employees.totalPages}`);

    for (const emp of employees.data) {
      console.log(`  - ${emp['firstName']} ${emp['lastName']}`);
    }

    // 6. Get employee documents
    console.log('\nFetching employee documents...');
    const documents = await essabu.hr.employees.getDocuments(employeeId);
    console.log(`Found ${documents.length} documents`);

    // 7. Get org chart
    console.log('\nFetching org chart...');
    const orgChart = await essabu.hr.employees.getOrgChart();
    console.log('Org chart:', orgChart);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation failed:');
      console.error('  Field errors:', error.fieldErrors);
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
