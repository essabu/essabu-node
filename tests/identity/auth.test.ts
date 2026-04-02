import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Essabu } from '../../src/client';
import type { EssabuConfig } from '../../src/config';
import { AuthenticationError } from '../../src/common/exceptions';

const TEST_CONFIG: EssabuConfig = {
  apiKey: 'test-api-key',
  tenantId: 'test-tenant-id',
  baseUrl: 'https://test.essabu.com',
};

function mockFetchJson(status: number, data: unknown): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      headers: new Headers(),
      json: vi.fn().mockResolvedValue(data),
      text: vi.fn().mockResolvedValue(JSON.stringify(data)),
    }),
  );
}

function mockFetchVoid(status: number = 204): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: true,
      headers: new Headers(),
      json: vi.fn().mockResolvedValue({}),
      text: vi.fn().mockResolvedValue(''),
    }),
  );
}

describe('AuthApi', () => {
  let essabu: Essabu;

  beforeEach(() => {
    essabu = new Essabu(TEST_CONFIG);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('should POST to /identity/auth/login', async () => {
      const tokens = {
        accessToken: 'eyJ...',
        refreshToken: 'ref_...',
        tokenType: 'Bearer',
        expiresIn: 3600,
      };
      mockFetchJson(200, tokens);

      const result = await essabu.identity.auth.login(
        'admin@example.com',
        'password123',
      );

      expect(result.accessToken).toBe('eyJ...');
      expect(result.refreshToken).toBe('ref_...');
      expect(result.tokenType).toBe('Bearer');
      expect(result.expiresIn).toBe(3600);

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/identity/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'admin@example.com',
            password: 'password123',
          }),
        }),
      );
    });

    it('should throw AuthenticationError on invalid credentials', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          status: 401,
          ok: false,
          headers: new Headers(),
          json: vi.fn().mockResolvedValue({ message: 'Invalid credentials' }),
          text: vi.fn().mockResolvedValue('Invalid credentials'),
        }),
      );

      await expect(
        essabu.identity.auth.login('wrong@example.com', 'wrong'),
      ).rejects.toThrow(AuthenticationError);
    });
  });

  describe('register', () => {
    it('should POST to /identity/auth/register', async () => {
      const user = {
        id: 'usr_1',
        email: 'new@example.com',
        firstName: 'Jean',
        lastName: 'Mukendi',
        status: 'pending',
        statusLabel: 'En attente',
        statusColor: 'yellow',
        createdAt: '2024-03-15T00:00:00Z',
        updatedAt: '2024-03-15T00:00:00Z',
      };
      mockFetchJson(201, user);

      const result = await essabu.identity.auth.register({
        email: 'new@example.com',
        password: 'securePassword123',
        firstName: 'Jean',
        lastName: 'Mukendi',
        phone: '+243810000000',
      });

      expect(result.id).toBe('usr_1');
      expect(result.email).toBe('new@example.com');
    });
  });

  describe('refresh', () => {
    it('should POST to /identity/auth/refresh', async () => {
      const newTokens = {
        accessToken: 'new_eyJ...',
        refreshToken: 'new_ref_...',
        tokenType: 'Bearer',
        expiresIn: 3600,
      };
      mockFetchJson(200, newTokens);

      const result = await essabu.identity.auth.refresh('old_ref_token');

      expect(result.accessToken).toBe('new_eyJ...');
      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/identity/auth/refresh',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ refreshToken: 'old_ref_token' }),
        }),
      );
    });
  });

  describe('logout', () => {
    it('should POST to /identity/auth/logout', async () => {
      mockFetchVoid();

      await essabu.identity.auth.logout();

      expect(fetch).toHaveBeenCalledWith(
        'https://test.essabu.com/identity/auth/logout',
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('verifyEmail', () => {
    it('should POST to /identity/auth/verify-email', async () => {
      mockFetchJson(200, { verified: true });

      const result = await essabu.identity.auth.verifyEmail('verification_token');

      expect(result).toEqual({ verified: true });
    });
  });

  describe('resetPassword', () => {
    it('should POST to /identity/auth/reset-password', async () => {
      mockFetchJson(200, { sent: true });

      const result = await essabu.identity.auth.resetPassword('user@example.com');

      expect(result).toEqual({ sent: true });
    });
  });

  describe('enable2fa', () => {
    it('should POST to /identity/auth/2fa/enable', async () => {
      const twoFa = {
        secret: 'JBSWY3DPEHPK3PXP',
        qrCodeUrl: 'otpauth://totp/Essabu?secret=JBSWY3DPEHPK3PXP',
        recoveryCodes: ['code1', 'code2', 'code3'],
      };
      mockFetchJson(200, twoFa);

      const result = await essabu.identity.auth.enable2fa();

      expect(result.secret).toBe('JBSWY3DPEHPK3PXP');
      expect(result.qrCodeUrl).toContain('otpauth://');
      expect(result.recoveryCodes).toHaveLength(3);
    });
  });
});

describe('IdentityClient sub-resources', () => {
  let essabu: Essabu;

  beforeEach(() => {
    essabu = new Essabu(TEST_CONFIG);
  });

  it('should expose all identity sub-resources', () => {
    expect(essabu.identity.auth).toBeDefined();
    expect(essabu.identity.users).toBeDefined();
    expect(essabu.identity.profiles).toBeDefined();
    expect(essabu.identity.companies).toBeDefined();
    expect(essabu.identity.tenants).toBeDefined();
    expect(essabu.identity.roles).toBeDefined();
    expect(essabu.identity.permissions).toBeDefined();
    expect(essabu.identity.branches).toBeDefined();
    expect(essabu.identity.apiKeys).toBeDefined();
    expect(essabu.identity.sessions).toBeDefined();
  });
});
