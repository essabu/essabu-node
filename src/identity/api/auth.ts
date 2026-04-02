import { BaseApi } from '../../common/models';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from '../models';

const BASE_PATH = '/api/identity/auth';

export class AuthApi extends BaseApi {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`${BASE_PATH}/login`, data);
  }

  async refreshToken(data: RefreshTokenRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`${BASE_PATH}/refresh`, data);
  }

  async logout(): Promise<void> {
    await this.post(`${BASE_PATH}/logout`);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await this.post(`${BASE_PATH}/forgot-password`, data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await this.post(`${BASE_PATH}/reset-password`, data);
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    await this.post(`${BASE_PATH}/verify-email`, data);
  }
}
