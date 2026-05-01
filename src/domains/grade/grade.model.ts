import type { MemberGradeCode } from '@/domains/member'

export interface GradeInfo {
  grade: MemberGradeCode
  displayName: string
  minReviewCount: number
  maxReviewCount: number | null
}
