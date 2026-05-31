import { PaymentStatus } from '../payment'
import type { OrderProduct } from './order.model'

export interface OrderCreateRequest {
  shopId: number
  orderItems: OrderProduct[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
}

export interface OrderCreateResponse {
  id: number
}

export interface OrderListItemResponse {
  id: number
  shopName: string
  shopThumbnailImageUrl: string
  firstProductName: string
  totalItemCount: number
  amount: number
  paymentStatus: PaymentStatus
  paymentDate: string
}
