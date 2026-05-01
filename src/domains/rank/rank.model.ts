import type { MemberGradeCode } from '@/domains/member'

export interface RankDuration {
  startAt: string
  endAt: string
}

export interface RankPrize {
  id: number
  prizeRank: number
  name: string
  brand: string
  imageUrl: string
}

export interface RankMember {
  memberId: number
  nickname: string
  profileImageUrl: string | null
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}
