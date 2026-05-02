import type { PaymentMethod, PaymentStatus } from '../payment'
import type { OrderMethod } from './order.types'

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

export interface OrderedItemOption {
  id: number
  optionGroupName: string
  optionName: string
  additionalPrice: number
}

export interface OrderedItem {
  id: number
  productId: number
  productName: string
  productImageUrl: string
  quantity: number
  unitPrice: number
  discountPrice: number | null
  optionTotalPrice: number
  totalPrice: number
  options: OrderedItemOption[]
  reviewed: boolean
}

export interface Payment {
  id: number
  approvedAt: string
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  cardCompany: string | null
  cardNumber: string | null
}

export interface Order {
  id: number
  placeName: string
  placeThumbnailImageUrl: string
  firstProductName: string
  totalItemCount: number
  amount: number
  paymentStatus: PaymentStatus
  paymentDate: string
}

export interface OrderDetail {
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
  orderItems: OrderedItem[]
  payment: Payment
  createdAt: string
}
