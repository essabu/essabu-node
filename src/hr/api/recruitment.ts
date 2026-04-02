import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const JOB_PATH = '/job-postings';
const APP_PATH = '/job-applications';

export class RecruitmentApi extends BaseHrApi {
  async createJobPosting(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(JOB_PATH, data);
  }

  async getJobPosting(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${JOB_PATH}/${id}`);
  }

  async listJobPostings(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(JOB_PATH, page));
  }

  async updateJobPosting(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${JOB_PATH}/${id}`, data);
  }

  async deleteJobPosting(id: string): Promise<void> {
    return this.http.delete(`${JOB_PATH}/${id}`);
  }

  async createApplication(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(APP_PATH, data);
  }

  async getApplication(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${APP_PATH}/${id}`);
  }

  async listApplications(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(APP_PATH, page));
  }

  async updateApplication(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${APP_PATH}/${id}`, data);
  }
}
