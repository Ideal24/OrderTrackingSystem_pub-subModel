// src/types/order.ts

export const OrderStatus = {
  ORDER_PLACED: 'ORDER PLACED',
  PACKED: 'PACKED',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT FOR DELIVERY',
  DELIVERED: 'DELIVERED'
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: OrderStatusType;
  progress: number;
  items: string[];
  totalAmount: number;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatusType;
  timestamp: string;
}