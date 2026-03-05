import { MemberGradeCode } from '../member'

export type FollowMemberResponse = {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  isFollowing: boolean
}
