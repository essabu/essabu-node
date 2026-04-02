import type { HttpClientInterface } from '../common/models';
import { ProjectsApi } from './api/projects';
import { TasksApi } from './api/tasks';
import { TimesheetsApi } from './api/timesheets';

/**
 * Project module client.
 */
export class ProjectClient {
  private _projects?: ProjectsApi;
  private _tasks?: TasksApi;
  private _timesheets?: TimesheetsApi;

  constructor(private readonly httpClient: HttpClientInterface) {}

  get projects(): ProjectsApi {
    return (this._projects ??= new ProjectsApi(this.httpClient));
  }

  get tasks(): TasksApi {
    return (this._tasks ??= new TasksApi(this.httpClient));
  }

  get timesheets(): TimesheetsApi {
    return (this._timesheets ??= new TimesheetsApi(this.httpClient));
  }
}
