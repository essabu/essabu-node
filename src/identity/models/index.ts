// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface TwoFactorResponse {
  secret: string;
  qrCodeUrl: string;
  recoveryCodes?: string[];
}

// User
export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  emailVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Profile
export interface ProfileResponse {
  id: string;
  userId: string;
  avatarUrl?: string;
  bio?: string;
  locale?: string;
  timezone?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Company
export interface CompanyResponse {
  id: string;
  name: string;
  tin?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  createdAt: string;
  updatedAt: string;
}

// Tenant
export interface TenantResponse {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  createdAt: string;
  updatedAt: string;
}

// Role
export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
}

// Permission
export interface PermissionResponse {
  id: string;
  name: string;
  description?: string;
  group?: string;
  createdAt: string;
  updatedAt: string;
}

// Branch
export interface BranchResponse {
  id: string;
  name: string;
  companyId: string;
  address?: string;
  phone?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  createdAt: string;
  updatedAt: string;
}

// API Key
export interface ApiKeyResponse {
  id: string;
  name: string;
  key?: string;
  prefix: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Session
export interface SessionResponse {
  id: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  isCurrent: boolean;
  lastActiveAt: string;
  createdAt: string;
}
