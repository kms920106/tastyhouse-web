import { PaymentStatus } from '../payment'

export type MemberGradeCode = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

export type MemberInfo = {
  id: number
  nickname: string
  grade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  fullName: string
  phoneNumber: string
  email: string
}

export type MemberCouponListItemResponse = {
  id: number
  couponId: number
  name: string
  description: string
  discountType: 'AMOUNT' | 'RATE'
  discountAmount: number
  maxDiscountAmount: number | null
  minOrderAmount: number
  useStartAt: string
  useEndAt: string
  expiredAt: string
  isUsed: boolean
  usedAt: string | null
  daysRemaining: number
}

export type UsablePointResponse = {
  usablePoints: number
}

export type MyReviewListItemResponse = {
  id: number
  imageUrl: string
}

export type MyReviewStatsResponse = {
  totalReviewCount: number
}

export type MyPaymentListItemResponse = {
  paymentId: number
  placeName: string
  placeThumbnailImageUrl: string
  firstProductName: string
  totalItemCount: number
  amount: number
  paymentStatus: PaymentStatus
  paymentDate: string
}

export type MyBookmarkedPlaceListItemResponse = {
  placeId: number
  bookmarkId: number
  placeName: string
  stationName: string
  rating: number
  imageUrl: string
  isBookmarked: boolean
}

export interface CartItem {
  id: number
  name: string
  imageUrl: string
  price: number
  originalPrice?: number
  quantity: number
  selected: boolean
  placeName: string
}

export interface Coupon {
  id: number
  couponName: string
  couponCode: string
  discountPoints: number
  minOrderAmount: number
  startDate: string
  endDate: string
  daysRemaining: number
  isExpired: boolean
}

export interface CouponListResponse {
  coupons: Coupon[]
  totalCount: number
}

export type PointType = 'EARNED' | 'USE'

export interface PointHistoryItem {
  reason: string
  date: string
  pointAmount: number
  pointType: PointType
}

export interface PointHistoryResponse {
  availablePoints: number
  expiredThisMonth: number
  histories: PointHistoryItem[]
}

export type LoginParams = {
  username: string
  password: string
}

export type LoginResult = { success: true; data: LoginResponse } | { success: false; error: string }

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export type UpdateProfileRequest = {
  nickname?: string
  statusMessage?: string
  profileImageFileId?: number
}
