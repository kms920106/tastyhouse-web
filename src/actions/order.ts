'use server'

import type { OrderItem } from '@/domains/order'
import { orderRepository } from '@/domains/order/order.repository'

export async function createOrder({
  placeId,
  orderItems,
  memberCouponId,
  usePoint,
  totalProductAmount,
  totalDiscountAmount,
  productDiscountAmount,
  couponDiscountAmount,
  finalAmount,
}: {
  placeId: number
  orderItems: OrderItem[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
}) {
  return orderRepository.createOrder({
    placeId,
    orderItems,
    memberCouponId,
    usePoint,
    totalProductAmount,
    totalDiscountAmount,
    productDiscountAmount,
    couponDiscountAmount,
    finalAmount,
  })
}

export async function getOrderList({ page, size }: { page: number; size: number }) {
  return orderRepository.getOrderList({ page, size })
}

export async function getOrderDetail(orderId: number) {
  return orderRepository.getOrderDetail(orderId)
}
