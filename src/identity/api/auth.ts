import type { HttpClient } from '../../common/http-client';
import type {
  RegisterRequest,
  TokenResponse,
  TwoFactorResponse,
  UserResponse,
} from '../models';

export class AuthApi {
  constructor(private readonly http: HttpClient) {}

  async login(email: string, password: string): Promise<TokenResponse> {
    return this.http.post('/auth/login', { email, password });
  }

  async register(data: RegisterRequest): Promise<UserResponse> {
    return this.http.post('/auth/register', data as unknown as Record<string, unknown>);
  }

  async refresh(refreshToken: string): Promise<TokenResponse> {
    return this.http.post('/auth/refresh', { refreshToken });
  }

  async logout(): Promise<void> {
    await this.http.postVoid('/auth/logout');
  }

  async verifyEmail(token: string): Promise<Record<string, unknown>> {
    return this.http.post('/auth/verify-email', { token });
  }

  async resetPassword(email: string): Promise<Record<string, unknown>> {
    return this.http.post('/auth/reset-password', { email });
  }

  async enable2fa(): Promise<TwoFactorResponse> {
    return this.http.post('/auth/2fa/enable');
  }
}
