import 'server-only'

import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import type { OrderCreateRequest, OrderCreateResponse, OrderListItemResponse } from './order.dto'
import type { OrderDetail } from './order.model'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<OrderCreateResponse>(`${ENDPOINT}/v1`, request)
  },
  async getOrderList(params: PaginationParams) {
    return api.get<OrderListItemResponse[]>(`${ENDPOINT}/v1`, { params })
  },
  async getOrderDetail(orderId: number) {
    return api.get<OrderDetail>(`${ENDPOINT}/v1/${orderId}`)
  },
}
