import type { HttpClient } from '../../common/http-client';
import type { StatisticsRequest, StatisticsResponse } from '../models';

export class StatisticsApi {
  constructor(private readonly http: HttpClient) {}

  async get(params?: StatisticsRequest): Promise<StatisticsResponse> {
    const queryParams: Record<string, unknown> = {};
    if (params) {
      if (params.startDate) queryParams['startDate'] = params.startDate;
      if (params.endDate) queryParams['endDate'] = params.endDate;
      if (params.groupBy) queryParams['groupBy'] = params.groupBy;
    }
    return this.http.get(
      '/statistics',
      Object.keys(queryParams).length > 0 ? queryParams : undefined,
    );
  }
}
