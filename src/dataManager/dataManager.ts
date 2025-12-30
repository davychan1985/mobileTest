import { ShippingOrder } from '@/src/types';
import localCache from './cache';
import shippingService from './service';

const CACHE_KEY = 'shipping_order_data';

// 数据管理中心，协调服务层和缓存层
class OrderDataManager {
  // 获取所有航运订单
  async getShippingOrders(): Promise<ShippingOrder[]> {
    try {
      // 从服务端获取订单数据
      const response = await shippingService.getShippingOrders();
      
      // 将单个订单包装为数组返回
      // 如果需要多个订单，可以扩展此方法以从多个来源获取数据
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error('获取航运订单失败:', error);
      throw error;
    }
  }

  // 订阅者列表（用于数据更新通知）
  private dataSubscribers = new Set<(data: ShippingOrder | null) => void>();
  // 当前缓存的数据
  private currentOrderData: ShippingOrder | null = null;

  // 获取订单数据（优先从缓存获取，缓存无效则从服务端获取）
  async getOrderData(forceRefresh: boolean = false): Promise<ShippingOrder | null> {
    try {
      let orderData: ShippingOrder | null = null;
      
      // 不强制刷新时，先查缓存
      if (!forceRefresh) {
        orderData = await localCache.getData(CACHE_KEY);
      }
      
      // 缓存没有数据，从服务端获取
      if (!orderData) {
        const response = await shippingService.getShippingOrders();
        orderData = response.data;
        // 仅在数据不为 null 时保存到缓存
        if (orderData) {
          await localCache.saveData(CACHE_KEY, orderData);
        }
      }
      
      // 更新当前数据并通知订阅者
      this.currentOrderData = orderData;
      this.notifySubscribers();
      return orderData;
    } catch (error) {
      console.error('获取订单数据失败:', error);
      throw error;
    }
  }

  // 订阅数据更新
  subscribeToUpdates(listener: (data: ShippingOrder | null) => void): () => void {
    this.dataSubscribers.add(listener);
    // 返回取消订阅的函数
    return () => this.dataSubscribers.delete(listener);
  }

  // 通知所有订阅者数据已更新
  private notifySubscribers(): void {
    this.dataSubscribers.forEach(listener => listener(this.currentOrderData));
  }

  // 强制刷新数据（清除缓存后重新获取）
  async refreshData(): Promise<ShippingOrder | null> {
    await localCache.clearCache(CACHE_KEY);
    return this.getOrderData(true);
  }
}

export default new OrderDataManager();