import type { OrderMethodType, OrderStatusCode } from './order.types'

const ORDER_STATUS_NAMES: Record<OrderStatusCode, string> = {
  PENDING: '주문대기',
  CONFIRMED: '주문확인',
  PREPARING: '준비 중',
  COMPLETED: '주문완료',
  CANCELLED: '주문취소',
}

export const getOrderStatusName = (status: OrderStatusCode): string => {
  return ORDER_STATUS_NAMES[status]
}

const ORDER_METHOD_TYPES: OrderMethodType[] = ['TABLE_ORDER', 'RESERVATION', 'DELIVERY', 'TAKEOUT']

export const parseOrderMethodType = (value: string | undefined): OrderMethodType | null => {
  return ORDER_METHOD_TYPES.includes(value as OrderMethodType) ? (value as OrderMethodType) : null
}
