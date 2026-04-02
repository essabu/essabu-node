/**
 * Example 2: HR - Employee Management
 * Create, update, and manage employees.
 */
import Essabu from '@essabu/sdk';
import type { CreateEmployeeRequest } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a new employee
  const newEmployee: CreateEmployeeRequest = {
    firstName: 'Jean',
    lastName: 'Mukendi',
    email: 'jean.mukendi@company.com',
    position: 'Software Engineer',
    hireDate: '2024-03-01',
    salary: 5000,
    currency: 'USD',
  };

  const employee = await essabu.hr.employees.create(newEmployee);
  console.log(`Created employee: ${employee.firstName} ${employee.lastName} (${employee.id})`);

  // Update the employee
  const updated = await essabu.hr.employees.update(employee.id, {
    position: 'Senior Software Engineer',
    salary: 6500,
  });
  console.log(`Updated position to: ${updated.position}`);

  // Retrieve by ID
  const fetched = await essabu.hr.employees.retrieve(employee.id);
  console.log(`Status: ${fetched.statusLabel} (${fetched.statusColor})`);

  // Search employees
  const { data: results } = await essabu.hr.employees.list({
    search: 'Mukendi',
    sortBy: 'lastName',
    sortOrder: 'asc',
  });
  console.log(`Search results: ${results.length} matches`);
}

main().catch(console.error);
