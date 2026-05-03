import type { CouponDiscountType, MemberGradeCode } from './member.types'

export interface MemberCoupon {
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
}

export interface Member {
  id: number
  nickname: string
  grade: MemberGradeCode
  statusMessage: string | null
  profileImageUrl: string | null
  fullName: string
  phoneNumber: string
  email: string
}

export interface SocialMember {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  following: boolean
}
