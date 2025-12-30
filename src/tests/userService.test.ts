import { API_BASE_URL } from '../configs/constants';
import { login } from '../services/userService';

// 模拟全局 fetch
global.fetch = jest.fn();

describe('userService', () => {
  const mockToken = 'test-token';
  const mockUser = { id: 1, name: 'Test User' };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should login successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ token: mockToken, user: mockUser }),
    });

    const result = await login('test@example.com', 'password123');
    
    expect(result).toEqual({ token: mockToken, user: mockUser });
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });
  });

  it('should throw error on failed login', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      text: jest.fn().mockResolvedValue('Unauthorized'),
    });

    await expect(login('invalid@example.com', 'wrong')).rejects.toThrow('Login failed');
  });
});