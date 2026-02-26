import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import type {
  OrderCreateRequest,
  OrderDetailResponse,
  OrderListResponse,
  OrderResponse,
} from './order.type'

const ENDPOINT = '/api/orders'

export const orderRepository = {
  async createOrder(request: OrderCreateRequest) {
    return api.post<OrderResponse>(`${ENDPOINT}/v1`, request)
  },
  async getOrderList(params: PaginationParams) {
    return api.get<OrderListResponse>(`${ENDPOINT}/v1`, {
      params,
    })
  },
  async getOrderDetail(orderId: number) {
    console.log(`${ENDPOINT}/v1/${orderId}`)
    return api.get<OrderDetailResponse>(`${ENDPOINT}/v1/${orderId}`)
  },
}
