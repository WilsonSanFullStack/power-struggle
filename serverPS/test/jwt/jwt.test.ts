import { generateToken, verifyToken } from '../../src/jwt/jwt';

describe('JWT Functions', () => {
  const payload = { userId: 1, username: 'example_user' };
  let token: string;

  test('should generate a valid JWT token', () => {
    token = generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('should verify a valid JWT token', async () => {
    const decoded = await verifyToken(token);
    expect(decoded.payload.userId).toBe(payload.userId);
    expect(decoded.payload.username).toBe(payload.username);
  });

  test('should reject an invalid JWT token', async () => {
    const invalidToken = 'invalid.token.string';
    await expect(verifyToken(invalidToken)).rejects.toThrow();
  });
});
