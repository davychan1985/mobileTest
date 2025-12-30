// 安全导航函数类型
export interface SafeNavigationOptions {
  showConfirm?: boolean;
  confirmMessage?: string;
  prefetch?: boolean;
  params?: Record<string, any>;
}