import orderData from '../../booking.json';
import { OrderResponse } from '../types';

// 数据服务层，负责获取原始数据
class ShippingDataService {
  // 获取航运订单数据（模拟API请求）
  async getShippingOrders(): Promise<OrderResponse> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      data: orderData,
      timestamp: Date.now()
    };
  }
}

export default new ShippingDataService();