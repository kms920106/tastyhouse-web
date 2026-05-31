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

export async function createReservation({
  shopId,
  reservationDate,
  reservationTime,
  guestCount,
  request,
}: {
  shopId: number
  reservationDate: string
  reservationTime: string
  guestCount: number
  request: string
}) {
  // TODO(예약 API): 백엔드 예약 생성 엔드포인트 확정 시 orderRepository.createReservation(params) 연결
  // 현재 백엔드 미제공 → 호출부 컨벤션({ data, error })을 깨지 않도록 임시 형태 반환
  console.log(shopId, reservationDate, reservationTime, guestCount, request)
  return { data: null, error: '예약 기능은 준비 중입니다.' as string | null }
}
