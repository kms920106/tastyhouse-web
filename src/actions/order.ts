'use server'

import { orderRepository, OrderCreateRequest } from '@/domains/order'

export async function createOrder(request: OrderCreateRequest) {
  return orderRepository.createOrder(request)
}

export async function getOrderList(page: number = 0, size: number = 9) {
  return orderRepository.getOrderList({ page, size })
}

export async function getOrderDetail(orderId: number) {
  return orderRepository.getOrderDetail(orderId)
}
