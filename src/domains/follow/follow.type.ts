import { MemberGradeCode } from '../member'

export interface FollowMemberResponse {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  following: boolean
}

export interface MemberSearchResponse {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  following: boolean
}
