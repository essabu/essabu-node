import type { HttpClient } from '../../common/http-client';
import type { VerificationResponse } from '../models';

export class VerificationApi {
  constructor(private readonly http: HttpClient) {}

  async verify(invoiceId: string): Promise<VerificationResponse> {
    return this.http.post('/verification/verify', { invoiceId });
  }
}
