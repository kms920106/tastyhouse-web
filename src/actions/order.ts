'use server'

import type { OrderMethodType, OrderProduct } from '@/domains/order'
import { orderRepository } from '@/domains/order/order.repository'

export async function createOrder({
  shopId,
  orderMethod,
  orderItems,
  memberCouponId,
  usePoint,
  totalProductAmount,
  totalDiscountAmount,
  productDiscountAmount,
  couponDiscountAmount,
  finalAmount,
  request,
}: {
  shopId: number
  orderMethod: OrderMethodType
  orderItems: OrderProduct[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
  request: string
}) {
  return orderRepository.createOrder({
    shopId,
    orderMethod,
    orderItems,
    memberCouponId,
    usePoint,
    totalProductAmount,
    totalDiscountAmount,
    productDiscountAmount,
    couponDiscountAmount,
    finalAmount,
    request,
  })
}

export async function getOrderList({ page, size }: { page: number; size: number }) {
  return orderRepository.getOrderList({ page, size })
}

export async function getOrderDetail(orderId: number) {
  return orderRepository.getOrderDetail(orderId)
}
