// API基础URL
export const API_BASE_URL = 'https://api.example.com/v1';

// 应用主题色
export const THEME_COLORS = {
  primary: '#1e88e5',
  secondary: '#ff4081',
  background: '#fafafa',
};

// 本地存储键
export const STORAGE_KEYS = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
};

// 验证规则
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
};

// Token配置
export const TOKEN_CONFIG = {
  // 默认过期时间（24小时）
  DEFAULT_EXPIRY_DURATION: 24 * 60 * 60 * 1000, // 毫秒
  // 刷新提前时间（1小时）
  REFRESH_THRESHOLD: 60 * 60 * 1000, // 毫秒
};