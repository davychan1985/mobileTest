import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, TOKEN_EXPIRY_KEY } from '../services/userService';
import { STORAGE_KEYS } from '../configs/constants';

interface AuthState {
  user: any;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ token: string; user: any }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  
  // 检查用户认证状态
  checkAuthStatus: async () => {
    try {
      // 检查token是否过期
      const expiryStr = await AsyncStorage.getItem(TOKEN_EXPIRY_KEY);
      if (expiryStr) {
        const expiryTime = parseInt(expiryStr, 10);
        if (Date.now() > expiryTime) {
          // Token已过期，清除本地存储
          await AsyncStorage.multiRemove([STORAGE_KEYS.USER_TOKEN, STORAGE_KEYS.USER_DATA, TOKEN_EXPIRY_KEY]);
          set({ user: null, token: null });
          return;
        }
      }
      
      const userData = await getCurrentUser();
      if (userData) {
        set({ user: userData, token: userData.token || null });
      } else {
        set({ user: null, token: null });
      }
    } catch (error) {
      console.log('User not authenticated:', error);
      set({ user: null, token: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // 登录
  login: async (email: string, password: string) => {
    const result = await import('../services/userService').then(mod => mod.login(email, password));
    set({ user: result.user, token: result.token });
    return result;
  },

  // 登出
  logout: async () => {
    try {
      // 清除本地存储
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_TOKEN, STORAGE_KEYS.USER_DATA, TOKEN_EXPIRY_KEY]);
      // 更新状态
      set({ user: null, token: null });
    } catch (error) {
      console.error('Error during logout:', error);
      // 即使出现错误，也要重置状态
      set({ user: null, token: null });
    }
  }
}));

export default useAuthStore;

// 为了保持与原有API的兼容性，我们提供一个useAuth hook
export const useAuth = () => {
  const { user, token, isLoading, login, logout, checkAuthStatus } = useAuthStore();
  
  return {
    user,
    token,
    isLoading,
    login,
    logout,
    checkAuthStatus
  };
};