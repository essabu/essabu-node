import type { HttpClient } from '../../common/http-client';
import type { ComplianceReportRequest, ComplianceReportResponse } from '../models';

export class ComplianceApi {
  constructor(private readonly http: HttpClient) {}

  async generateReport(params: ComplianceReportRequest): Promise<ComplianceReportResponse> {
    return this.http.post('/compliance/reports', params as unknown as Record<string, unknown>);
  }
}
