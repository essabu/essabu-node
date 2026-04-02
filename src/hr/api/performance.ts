import { BaseHrApi } from './base';
import type { PageRequest, PageResponse } from '../../common/models';

const REVIEW_PATH = '/performance-reviews';
const GOAL_PATH = '/performance-goals';

export class PerformanceApi extends BaseHrApi {
  async createReview(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(REVIEW_PATH, data);
  }

  async getReview(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${REVIEW_PATH}/${id}`);
  }

  async listReviews(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(REVIEW_PATH, page));
  }

  async updateReview(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${REVIEW_PATH}/${id}`, data);
  }

  async createGoal(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.post(GOAL_PATH, data);
  }

  async getGoal(id: string): Promise<Record<string, unknown>> {
    return this.http.get(`${GOAL_PATH}/${id}`);
  }

  async listGoals(page?: PageRequest): Promise<PageResponse> {
    return this.http.get(this.withPagination(GOAL_PATH, page));
  }

  async updateGoal(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.http.put(`${GOAL_PATH}/${id}`, data);
  }
}
