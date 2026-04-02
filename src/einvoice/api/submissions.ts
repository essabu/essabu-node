import type { HttpClient } from '../../common/http-client';
import type { SubmissionResponse, SubmissionStatusResponse } from '../models';

export class SubmissionsApi {
  constructor(private readonly http: HttpClient) {}

  async submit(invoiceId: string, metadata?: Record<string, string>): Promise<SubmissionResponse> {
    return this.http.post('/submissions', {
      invoiceId,
      ...(metadata ? { metadata } : {}),
    });
  }

  async checkStatus(submissionId: string): Promise<SubmissionStatusResponse> {
    return this.http.get(`/submissions/${submissionId}/status`);
  }

  async list(params?: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.get('/submissions', params);
  }
}
