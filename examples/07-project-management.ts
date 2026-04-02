/**
 * Example 7: Project Management
 * Create projects, tasks, and track timesheets.
 */
import Essabu from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? '',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? '',
  });

  // Create a project
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

  // Add a team member
  await essabu.project.projects.addMember(project.id, 'user-123', 'developer');

  // Create tasks
  const task = await essabu.project.tasks.create({
    projectId: project.id,
    title: 'Design homepage mockup',
    priority: 'high',
    dueDate: '2024-04-15',
    estimatedHours: 16,
    tags: ['design', 'homepage'],
  });
  console.log(`Task created: ${task.title} (${task.priorityLabel})`);

  // Assign the task
  await essabu.project.tasks.assign(task.id, 'user-456');

  // Log timesheet
  const timesheet = await essabu.project.timesheets.create({
    projectId: project.id,
    taskId: task.id,
    date: '2024-04-05',
    hours: 4,
    description: 'Initial wireframes',
    billable: true,
  });
  console.log(`Logged ${timesheet.hours}h (billable: ${timesheet.billable})`);

  // Complete the task
  const completed = await essabu.project.tasks.complete(task.id);
  console.log(`Task status: ${completed.statusLabel}`);
}

main().catch(console.error);
