import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS, TOKEN_CONFIG } from '../configs/constants';

export const TOKEN_EXPIRY_KEY = 'token_expiry';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  
  const { token, user } = await response.json();
  
  // 保存token到本地存储
  await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
  await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  
  // 设置token过期时间（当前时间 + 有效期）
  const expiryTime = Date.now() + TOKEN_CONFIG.DEFAULT_EXPIRY_DURATION;
  await AsyncStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  
  return { token, user };
}

// 检查token是否即将过期
export async function isTokenExpiringSoon() {
  const expiryStr = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryStr) return true; // 如果没有过期时间，认为即将过期

  const expiryTime = parseInt(expiryStr, 10);
  const currentTime = Date.now();
  const timeUntilExpiry = expiryTime - currentTime;

  return timeUntilExpiry < TOKEN_CONFIG.REFRESH_THRESHOLD;
}

// 手动刷新token（如果API支持）
export async function refreshToken() {
  // 这里需要实现具体的刷新逻辑，取决于后端API的设计
  // 通常需要一个刷新token或者重新验证用户凭证
  console.log('Token refresh functionality needs to be implemented based on your backend API');
}

export async function getCurrentUser() {
  const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  if (!token) return null;
  
  // 检查token是否过期
  const expiryStr = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
  if (expiryStr) {
    const expiryTime = parseInt(expiryStr, 10);
    if (Date.now() > expiryTime) {
      // Token已过期，清除本地存储
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_TOKEN, STORAGE_KEYS.USER_DATA, TOKEN_EXPIRY_KEY]);
      return null;
    }
  }
  
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) {
    // 如果请求失败，可能是token无效，清除本地存储
    await AsyncStorage.multiRemove([STORAGE_KEYS.USER_TOKEN, STORAGE_KEYS.USER_DATA, TOKEN_EXPIRY_KEY]);
    throw new Error('Failed to fetch user');
  }
  
  return await response.json();
}