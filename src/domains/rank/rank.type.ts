import { MemberGradeCode } from '@/domains/member'

type RankType = 'ALL' | 'MONTHLY' | 'WEEKLY'

export type RankPeriod = 'all' | 'monthly'

export const rankPeriodToRankType = (period: RankPeriod): RankType => {
  const periodMap: Record<RankPeriod, RankType> = {
    all: 'ALL',
    monthly: 'MONTHLY',
  }
  return periodMap[period]
}

export interface RankMemberQuery {
  type: RankType
  limit: number
}

export interface RankMembersMeQuery {
  type: RankType
}

export interface RankMemberMeResponse {
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}

export interface RankMemberListItemResponse {
  memberId: number
  nickname: string
  profileImageUrl: string
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}
