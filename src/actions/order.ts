'use server'

import type { OrderProduct } from '@/domains/order'
import { orderRepository } from '@/domains/order/order.repository'

export async function createOrder({
  shopId,
  orderItems,
  memberCouponId,
  usePoint,
  totalProductAmount,
  totalDiscountAmount,
  productDiscountAmount,
  couponDiscountAmount,
  finalAmount,
}: {
  shopId: number
  orderItems: OrderProduct[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
}) {
  return orderRepository.createOrder({
    shopId,
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
