import { PaymentStatus } from '../payment'

export type MemberGradeCode = 'NEWCOMER' | 'ACTIVE' | 'INSIDER' | 'GOURMET' | 'TEHA'

export interface MemberInfo {
  id: number
  nickname: string
  grade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  fullName: string
  phoneNumber: string
  email: string
}

export interface MemberCouponListItemResponse {
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

export interface UsablePointResponse {
  usablePoints: number
}

export interface MyReviewListItemResponse {
  id: number
  imageUrl: string
}

export interface MyReviewStatsResponse {
  totalReviewCount: number
}

export interface MyPaymentListItemResponse {
  paymentId: number
  placeName: string
  placeThumbnailImageUrl: string
  firstProductName: string
  totalItemCount: number
  amount: number
  paymentStatus: PaymentStatus
  paymentDate: string
}

export interface MyBookmarkedPlaceListItemResponse {
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

export interface LoginParams {
  username: string
  password: string
}

export type LoginResult = { success: true; data: LoginResponse } | { success: false; error: string }

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface OtherMemberProfileResponse {
  id: number
  nickname: string
  memberGrade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  reviewCount: number
  followingCount: number
  followerCount: number
  isFollowing: boolean
}

export interface UpdateProfileRequest {
  nickname?: string
  statusMessage?: string
  profileImageFileId?: number
}

export interface VerifyPasswordRequest {
  password: string
}

export interface VerifyPasswordResponse {
  verifyToken: string
}

export type Gender = 'MALE' | 'FEMALE'

export interface UpdatePersonalInfoRequest {
  fullName: string
  phoneNumber?: string
  birthDate?: number
  gender?: Gender
  pushNotificationEnabled?: boolean
  marketingInfoEnabled?: boolean
  eventInfoEnabled?: boolean
}

export interface PersonalInfoResponse {
  email: string
  fullName: string
  phoneNumber: string
  birthDate: number | null
  gender: Gender | null
  pushNotificationEnabled: boolean
  marketingInfoEnabled: boolean
  eventInfoEnabled: boolean
}

export type WithdrawReason =
  | 'LOW_USAGE_FREQUENCY'
  | 'INSUFFICIENT_CONTENT'
  | 'SWITCH_TO_ANOTHER_SERVICE'
  | 'PRIVACY_CONCERNS'
  | 'OTHER'

export const WITHDRAW_REASON_LABEL: Record<WithdrawReason, string> = {
  LOW_USAGE_FREQUENCY: '서비스 이용 빈도가 낮아서',
  INSUFFICIENT_CONTENT: '콘텐츠가 부족해서',
  SWITCH_TO_ANOTHER_SERVICE: '다른 서비스로 이동',
  PRIVACY_CONCERNS: '개인정보 보호 우려',
  OTHER: '기타',
}

export interface WithdrawRequest {
  reason: WithdrawReason
  reasonDetail?: string
}

export interface UpdatePasswordRequest {
  newPassword: string
  newPasswordConfirm: string
}
