import { MemberGradeCode } from '@/domains/member'

export interface MyGradeResponse {
  currentGrade: MemberGradeCode
  currentGradeDisplayName: string
  nextGrade: MemberGradeCode | null
  nextGradeDisplayName: string | null
  currentReviewCount: number
  reviewsNeededForNextGrade: number | null
}

export interface GradeInfoItem {
  grade: MemberGradeCode
  displayName: string
  minReviewCount: number
  maxReviewCount: number | null
}
