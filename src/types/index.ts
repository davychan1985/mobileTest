// 地点信息（包含代码、显示名和链接）
export interface LocationInfo {
  code: string;
  displayName: string;
  url: string;
}

// 起止点对（包含出发地、目的地及对应城市）
export interface RoutePair {
  destination: LocationInfo;
  destinationCity: string;
  origin: LocationInfo;
  originCity: string;
}

// 航段信息
export interface VoyageSegment {
  id: number;
  originAndDestinationPair: RoutePair;
}

// 完整的航运订单信息
export interface ShippingOrder {
  shipReference: string;
  shipToken: string;
  canIssueTicketChecking: boolean;
  expiryTime: string;
  duration: number;
  segments: VoyageSegment[];
}

// 接口返回的数据结构
export interface OrderResponse {
  data: ShippingOrder;
  timestamp: number;
}