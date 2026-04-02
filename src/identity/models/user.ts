import type { BaseResource } from '../../common/models';

export interface User extends BaseResource {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  locale?: string;
  timezone?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  roles: string[];
  lastLoginAt?: string;
  emailVerifiedAt?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  locale?: string;
  timezone?: string;
  roles?: string[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  locale?: string;
  timezone?: string;
  roles?: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
