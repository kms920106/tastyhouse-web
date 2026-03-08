import { MemberGradeCode } from '../member'

export interface MemberSocialResponse {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  following: boolean
}

export type FollowMemberResponse = MemberSocialResponse

export type MemberSearchResponse = MemberSocialResponse
