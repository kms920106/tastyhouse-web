import { PaymentMethod, PaymentStatus } from '../payment'

export type OrderMethod = 'TABLE_ORDER' | 'RESERVATION' | 'DELIVERY' | 'TAKEOUT'

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'COMPLETED' | 'CANCELLED'

export interface OrderMethodItem {
  code: OrderMethod
  name: string
}

export interface OrderItemOption {
  groupId: number
  groupName: string
  optionId: number
  optionName: string
  additionalPrice: number
}

export interface OrderItem {
  productId: number
  optionKey: string
  name: string
  imageUrl: string
  quantity: number
  salePrice: number
  originalPrice: number
  discountPrice: number
  selectedOptions: OrderItemOption[]
}

export interface OrderCreateRequest {
  placeId: number
  orderItems: OrderItem[]
  memberCouponId: number | null
  usePoint: number
  totalProductAmount: number
  totalDiscountAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  finalAmount: number
}

export interface OrderResponse {
  id: number
}

export interface OrderItemOptionResponse {
  id: number
  optionGroupName: string
  optionName: string
  additionalPrice: number
}

export interface OrderItemResponse {
  id: number
  productId: number
  productName: string
  productImageUrl: string
  quantity: number
  unitPrice: number
  discountPrice: number | null
  optionTotalPrice: number
  totalPrice: number
  options: OrderItemOptionResponse[]
  reviewed: boolean
}

export interface PaymentSummaryResponse {
  id: number
  approvedAt: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  cardCompany: string | null
  cardNumber: string | null
}

export type OrderListResponse = OrderListItemResponse[]

interface OrderListItemResponse {
  id: number
  placeName: string
  placeThumbnailImageUrl: string
  firstProductName: string
  totalItemCount: number
  amount: number
  paymentStatus: PaymentStatus
  paymentDate: string
}

export interface OrderDetailResponse {
  id: number
  orderNumber: string
  paymentStatus: PaymentStatus
  placeName: string
  placePhoneNumber: string
  ordererName: string
  ordererPhone: string
  ordererEmail: string
  totalProductAmount: number
  productDiscountAmount: number
  couponDiscountAmount: number
  pointDiscountAmount: number
  totalDiscountAmount: number
  finalAmount: number
  usedPoint: number
  earnedPoint: number
  orderItems: OrderItemResponse[]
  payment: PaymentSummaryResponse
  createdAt: string
}
