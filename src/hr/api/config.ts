import { BaseHrApi } from './base';

const BASE_PATH = '/config';

export class ConfigApi extends BaseHrApi {
  async get(): Promise<Record<string, unknown>> {
    return this.http.get(BASE_PATH);
  }

  async update(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(BASE_PATH, data);
  }
}
