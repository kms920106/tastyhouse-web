import { MemberGradeCode } from '../member'

export interface MemberSocialProfile {
  memberId: number
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
  following: boolean
}
