import type { PaymentStatus } from '../payment'
import type {
  CouponDiscountType,
  MemberGender,
  MemberGradeCode,
  PointType,
  WithdrawReason,
} from './member.types'

interface PointHistoryItem {
  reason: string
  date: string
  pointAmount: number
  pointType: PointType
}

export interface NicknameAvailabilityResponse {
  available: boolean
}

export interface PhoneAvailabilityResponse {
  available: boolean
}

export interface OtherMemberProfileResponse {
  id: number
  nickname: string
  memberGrade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  following: boolean
}

export interface MemberInfoResponse {
  id: number
  nickname: string
  grade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  fullName: string
  phoneNumber: string
  email: string
}

export interface MemberStatsResponse {
  reviewCount: number
  followingCount: number
  followerCount: number
}

export interface MemberCouponListItemResponse {
  id: number
  couponId: number
  name: string
  description: string
  discountType: CouponDiscountType
  discountAmount: number
  maxDiscountAmount: number | null
  minOrderAmount: number
  useStartAt: string
  useEndAt: string
  expiredAt: string
  isUsed: boolean
  usedAt: string | null
  daysRemaining: number
  isExpired: boolean
}

export interface UsablePointResponse {
  usablePoints: number
}

export interface PointHistoryResponse {
  availablePoints: number
  expiredThisMonth: number
  histories: PointHistoryItem[]
}

export interface MyReviewCountResponse {
  reviewCount: number
}

export interface MyReviewListItemResponse {
  id: number
  imageUrl: string
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

export interface UpdateProfileRequest {
  nickname?: string
  statusMessage?: string
  profileImageFileId?: number
}

export interface PersonalInfoResponse {
  email: string
  fullName: string
  phoneNumber: string
  birthDate: number | null
  gender: MemberGender | null
  pushNotificationEnabled: boolean
  marketingInfoEnabled: boolean
  eventInfoEnabled: boolean
}

export interface VerifyPasswordRequest {
  password: string
}

export interface VerifyPasswordResponse {
  verifyToken: string
}

export interface UpdatePersonalInfoRequest {
  fullName: string
  phoneNumber?: string
  birthDate?: number
  gender?: MemberGender
  pushNotificationEnabled?: boolean
  marketingInfoEnabled?: boolean
  eventInfoEnabled?: boolean
}

export interface MyGradeResponse {
  currentGrade: MemberGradeCode
  currentGradeDisplayName: string
  nextGrade: MemberGradeCode | null
  nextGradeDisplayName: string | null
  currentReviewCount: number
  reviewsNeededForNextGrade: number | null
}

export interface UpdatePasswordRequest {
  newPassword: string
  newPasswordConfirm: string
}

export interface WithdrawRequest {
  reason: WithdrawReason
  reasonDetail?: string
}
