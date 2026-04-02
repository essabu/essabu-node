/**
 * Project module client. Provides access to project management
 * API resources including tasks, milestones, and resource allocations.
 */

import type { EssabuConfig } from '../config';
import { HttpClient } from '../common/http-client';
import { ProjectsApi } from './api/projects';
import { MilestonesApi } from './api/milestones';
import { TasksApi } from './api/tasks';
import { TaskCommentsApi } from './api/task-comments';
import { ResourceAllocationsApi } from './api/resource-allocations';
import { ReportsApi } from './api/reports';

export class ProjectClient {
  private readonly http: HttpClient;

  private _projects?: ProjectsApi;
  private _milestones?: MilestonesApi;
  private _tasks?: TasksApi;
  private _taskComments?: TaskCommentsApi;
  private _resourceAllocations?: ResourceAllocationsApi;
  private _reports?: ReportsApi;

  constructor(config: EssabuConfig) {
    this.http = new HttpClient(config, '/project');
  }

  get projects(): ProjectsApi {
    return (this._projects ??= new ProjectsApi(this.http));
  }

  get milestones(): MilestonesApi {
    return (this._milestones ??= new MilestonesApi(this.http));
  }

  get tasks(): TasksApi {
    return (this._tasks ??= new TasksApi(this.http));
  }

  get taskComments(): TaskCommentsApi {
    return (this._taskComments ??= new TaskCommentsApi(this.http));
  }

  get resourceAllocations(): ResourceAllocationsApi {
    return (this._resourceAllocations ??= new ResourceAllocationsApi(this.http));
  }

  get reports(): ReportsApi {
    return (this._reports ??= new ReportsApi(this.http));
  }
}
