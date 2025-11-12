import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShippingOrder } from '../types';

// 缓存项结构
interface CacheEntry {
  data: ShippingOrder;
  timestamp: number;
  ttl: number; // 缓存有效期（毫秒）
}

// 本地缓存管理
class LocalCache {
  // 保存数据到缓存
  async saveData(key: string, data: ShippingOrder, ttl: number = 3600000): Promise<void> {
    const cacheItem: CacheEntry = {
      data,
      timestamp: Date.now(),
      ttl
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
  }

  // 从缓存获取数据（自动检查有效期）
  async getData(key: string): Promise<ShippingOrder | null> {
    const itemStr = await AsyncStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr) as CacheEntry;
    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      await AsyncStorage.removeItem(key);
      return null;
    }
    return item.data;
  }

  // 清除指定缓存
  async clearCache(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

export default new LocalCache();