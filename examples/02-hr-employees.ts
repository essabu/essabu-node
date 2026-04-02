/**
 * Example 2: HR - Employee Management
 * Create, update, and manage employees.
 */
import Essabu from '@essabu/sdk';
import type { CreateEmployeeRequest } from '@essabu/sdk';

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
   * Create a new employee by providing required fields: first name, last name, and email.
   * Optional fields include position, hire date, salary, and currency. Returns the created
   * Employee object with a generated UUID. Throws a ValidationError if required fields are
   * missing or the email is already in use.
   */
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

  /**
   * Partially update an existing employee by ID. Only the provided fields are modified;
   * all other fields remain unchanged. Returns the full updated Employee object.
   */
  const updated = await essabu.hr.employees.update(employee.id, {
    position: 'Senior Software Engineer',
    salary: 6500,
  });
  console.log(`Updated position to: ${updated.position}`);

  /**
   * Retrieve a single employee by their UUID. Returns the complete Employee object
   * including status, statusLabel, and statusColor fields provided by the backend.
   * Throws a NotFoundError if no employee exists with the given ID.
   */
  const fetched = await essabu.hr.employees.retrieve(employee.id);
  console.log(`Status: ${fetched.statusLabel} (${fetched.statusColor})`);

  /**
   * Search employees by name using the `search` parameter, with results sorted by
   * last name in ascending order. Returns a paginated response with matching employees.
   * The search applies across first name, last name, and email fields.
   */
  const { data: results } = await essabu.hr.employees.list({
    search: 'Mukendi',
    sortBy: 'lastName',
    sortOrder: 'asc',
  });
  console.log(`Search results: ${results.length} matches`);
}

main().catch(console.error);
