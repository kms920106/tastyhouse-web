import type { MemberGradeCode } from '@/domains/member'
import type { RankType } from './rank.types'

export interface RankMemberQuery {
  type: RankType
  limit: number
}

export interface RankMemberMeQuery {
  type: RankType
}

export interface RankDurationResponse {
  startAt: string
  endAt: string
}

export interface RankPrizeListItemResponse {
  id: number
  prizeRank: number
  name: string
  brand: string
  imageUrl: string
}

export interface RankMemberListItemResponse {
  memberId: number
  nickname: string
  profileImageUrl: string | null
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}

export interface RankMemberMeResponse {
  memberId: number
  nickname: string
  profileImageUrl: string | null
  reviewCount: number
  rankNo: number
  grade: MemberGradeCode
}
