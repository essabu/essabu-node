import { CrudApi } from './base';
import type { SessionResponse } from '../models';
import type { HttpClient } from '../../common/http-client';

export class SessionsApi extends CrudApi<SessionResponse> {
  constructor(http: HttpClient) {
    super(http, '/sessions');
  }

  async revoke(sessionId: string): Promise<void> {
    return this.http.delete(`${this.basePath}/${sessionId}`);
  }

  async revokeAll(): Promise<void> {
    return this.http.delete(this.basePath);
  }
}
