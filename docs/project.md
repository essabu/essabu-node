# Project Module

Project management: projects, tasks, and timesheets with workflow actions.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `ProjectsApi` | `/api/project/projects` | Project management |
| `TasksApi` | `/api/project/tasks` | Task tracking |
| `TimesheetsApi` | `/api/project/timesheets` | Time tracking and approval |

## ProjectsApi

Provides full CRUD operations for projects along with archiving and member management. Create projects with a name, date range, and budget. The `archive()` and `unarchive()` methods toggle the project's archived state. The `addMember()` method assigns a user to the project with an optional role (e.g., developer, designer). The `removeMember()` method removes a user from the project team.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Project>>
    // GET /api/project/projects

async retrieve(id: string): Promise<Project>
    // GET /api/project/projects/{id}

async create(data: CreateProjectRequest): Promise<Project>
    // POST /api/project/projects

async update(id: string, data: UpdateProjectRequest): Promise<Project>
    // PATCH /api/project/projects/{id}

async remove(id: string): Promise<void>
    // DELETE /api/project/projects/{id}

async archive(id: string): Promise<Project>
    // POST /api/project/projects/{id}/archive

async unarchive(id: string): Promise<Project>
    // POST /api/project/projects/{id}/unarchive

async addMember(id: string, userId: string, role?: string): Promise<void>
    // POST /api/project/projects/{id}/members

async removeMember(id: string, userId: string): Promise<void>
    // DELETE /api/project/projects/{id}/members/{userId}
```

## TasksApi

Manages project tasks with CRUD operations and workflow transitions. Create tasks linked to a project with a title, optional assignee, priority, and due date. The `complete()` method marks a task as done. The `reopen()` method moves a completed task back to in-progress status. The `assign()` method reassigns the task to a different user by their ID.

```typescript
async list(params?: PageRequest): Promise<PageResponse<ProjectTask>>
    // GET /api/project/tasks

async retrieve(id: string): Promise<ProjectTask>
    // GET /api/project/tasks/{id}

async create(data: CreateProjectTaskRequest): Promise<ProjectTask>
    // POST /api/project/tasks

async update(id: string, data: UpdateProjectTaskRequest): Promise<ProjectTask>
    // PATCH /api/project/tasks/{id}

async remove(id: string): Promise<void>
    // DELETE /api/project/tasks/{id}

async complete(id: string): Promise<ProjectTask>
    // POST /api/project/tasks/{id}/complete

async reopen(id: string): Promise<ProjectTask>
    // POST /api/project/tasks/{id}/reopen

async assign(id: string, assigneeId: string): Promise<ProjectTask>
    // POST /api/project/tasks/{id}/assign
```

## TimesheetsApi

Tracks time spent on tasks with CRUD operations and an approval workflow. Create timesheet entries with a task reference, user ID, date, and hours worked. The `approve()` method validates the time entry for billing and reporting. The `reject()` method returns the entry to the submitter with an optional reason for correction.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Timesheet>>
    // GET /api/project/timesheets

async retrieve(id: string): Promise<Timesheet>
    // GET /api/project/timesheets/{id}

async create(data: CreateTimesheetRequest): Promise<Timesheet>
    // POST /api/project/timesheets

async update(id: string, data: UpdateTimesheetRequest): Promise<Timesheet>
    // PATCH /api/project/timesheets/{id}

async remove(id: string): Promise<void>
    // DELETE /api/project/timesheets/{id}

async approve(id: string): Promise<Timesheet>
    // POST /api/project/timesheets/{id}/approve

async reject(id: string, reason?: string): Promise<Timesheet>
    // POST /api/project/timesheets/{id}/reject
```

## Code Examples

### Project Lifecycle

Create a project with a name, description, date range, and budget. Add team members with specific roles and remove them as needed. Archive completed projects to hide them from active listings, and unarchive them if work resumes. Returns the Project object with its generated UUID and current status.

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

// Create a project
const project = await client.project.projects.create({
  name: 'Website Redesign',
  description: 'Complete redesign of the corporate website',
  startDate: '2026-04-01',
  endDate: '2026-09-30',
  budget: 50000,
});

// Manage members
await client.project.projects.addMember(project.id, 'user-uuid', 'developer');
await client.project.projects.removeMember(project.id, 'user-uuid');

// Archive / unarchive
await client.project.projects.archive(project.id);
await client.project.projects.unarchive(project.id);
```

### Task Management

Create a task within a project specifying the title, description, assignee, priority level, and due date. Reassign tasks to different team members, mark them as complete when finished, or reopen them if additional work is needed. List all tasks with pagination to build project boards or backlog views.

```typescript
const task = await client.project.tasks.create({
  projectId: project.id,
  title: 'Design mockups',
  description: 'Create wireframes and high-fidelity mockups',
  assigneeId: 'user-uuid',
  priority: 'high',
  dueDate: '2026-04-15',
});

// Assign, complete, reopen
await client.project.tasks.assign(task.id, 'other-user-uuid');
await client.project.tasks.complete(task.id);
await client.project.tasks.reopen(task.id);

// List tasks for a project
const tasks = await client.project.tasks.list({ page: 1, pageSize: 50 });
```

### Timesheets

Log time against a specific task by providing the task ID, user ID, date, hours worked, and a description. Approve timesheet entries for billing and reporting purposes, or reject them with a reason if the hours or description need correction. Returns the Timesheet object with the recorded hours and approval status.

```typescript
const entry = await client.project.timesheets.create({
  taskId: task.id,
  userId: 'user-uuid',
  date: '2026-03-26',
  hours: 4.5,
  description: 'Wireframe design work',
});

// Approve / reject timesheets
await client.project.timesheets.approve(entry.id);
await client.project.timesheets.reject(entry.id, 'Hours seem too high');
```
