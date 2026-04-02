# Project Module

Project management: projects, tasks, and timesheets with workflow actions.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `ProjectsApi` | `/api/project/projects` | Project management |
| `TasksApi` | `/api/project/tasks` | Task tracking |
| `TimesheetsApi` | `/api/project/timesheets` | Time tracking and approval |

## ProjectsApi

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
