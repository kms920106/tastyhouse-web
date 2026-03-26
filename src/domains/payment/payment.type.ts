export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export type PaymentMethod =
  | 'CASH_ON_SITE'
  | 'CARD_ON_SITE'
  | 'CREDIT_CARD'
  | 'MOBILE'
  | 'KAKAO_PAY'
  | 'ZERO_PAY'

export interface PaymentMethodOption {
  type: PaymentMethod
  label: string
  badge?: string
  benefitTitle?: string
  benefitDescription?: string
}

export interface PaymentCreateRequest {
  orderId: number
  paymentMethod: PaymentMethod
}

export interface PaymentConfirmRequest {
  paymentKey: string
  pgOrderId: string
  amount: number
}

export interface PaymentCancelRequest {
  cancelReason: string
}

export type PaymentCancelCode =
  | 'SUCCESS'
  | 'ALREADY_PREPARING'
  | 'ALREADY_CANCELLED'
  | 'ORDER_COMPLETED'
  | 'CANCEL_FAILED'

export interface PaymentCancelResponse {
  code: PaymentCancelCode
  message: string
}

export interface PaymentResponse {
  id: number
  orderId: number
  pgOrderId: string
}
