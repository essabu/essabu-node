/**
 * Example 7: Project Management
 * Create projects, tasks, and track timesheets.
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
   * Create a new project with a name, code, description, budget, currency, and date
   * range. The project code serves as a short human-readable identifier. Returns the
   * created Project object with a generated UUID, current status, and budget details.
   * Throws a ValidationError if required fields are missing.
   */
  const project = await essabu.project.projects.create({
    name: 'Website Redesign',
    code: 'WEB-2024',
    description: 'Complete website redesign for Q2',
    budget: 50000,
    currency: 'USD',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
  });
  console.log(`Project created: ${project.name} (Budget: $${project.budget})`);

  /**
   * Add a team member to the project by specifying their user ID and an optional role
   * (e.g., developer, designer, manager). This grants the user access to the project's
   * tasks and timesheets. Returns void on success.
   */
  await essabu.project.projects.addMember(project.id, 'user-123', 'developer');

  /**
   * Create a task within the project with a title, priority level, due date, estimated
   * hours, and optional tags for categorization. Returns the created ProjectTask object
   * with its priority label and status. Throws a NotFoundError if the project ID is
   * invalid.
   */
  const task = await essabu.project.tasks.create({
    projectId: project.id,
    title: 'Design homepage mockup',
    priority: 'high',
    dueDate: '2024-04-15',
    estimatedHours: 16,
    tags: ['design', 'homepage'],
  });
  console.log(`Task created: ${task.title} (${task.priorityLabel})`);

  /**
   * Assign the task to a specific user by their ID. This updates the task's assignee
   * and sends a notification to the assigned user. Returns the updated ProjectTask
   * object.
   */
  await essabu.project.tasks.assign(task.id, 'user-456');

  /**
   * Log a timesheet entry against the project and task for a specific date. Specify
   * the hours worked, a description of the work performed, and whether the time is
   * billable. Returns the created Timesheet object with the recorded hours and
   * billable flag.
   */
  const timesheet = await essabu.project.timesheets.create({
    projectId: project.id,
    taskId: task.id,
    date: '2024-04-05',
    hours: 4,
    description: 'Initial wireframes',
    billable: true,
  });
  console.log(`Logged ${timesheet.hours}h (billable: ${timesheet.billable})`);

  /**
   * Mark the task as complete, transitioning its status to "completed". Returns the
   * updated ProjectTask object with the new status label. Throws a ValidationError
   * if the task is already completed.
   */
  const completed = await essabu.project.tasks.complete(task.id);
  console.log(`Task status: ${completed.statusLabel}`);
}

main().catch(console.error);
