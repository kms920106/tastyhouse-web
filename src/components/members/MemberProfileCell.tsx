import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/members/MemberGradeBadge'
import MemberGradeIcon from '@/components/members/MemberGradeIcon'
import MemberGradeName from '@/components/members/MemberGradeName'
import MemberNickname from '@/components/members/MemberNickname'
import { MemberGradeCode } from '@/domains/member'

interface Props {
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
}

export default function MemberProfileCell({ nickname, memberGrade, profileImageUrl }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={profileImageUrl} alt={nickname} />
      <div className="flex flex-col gap-[9px]">
        <MemberNickname size="md">{nickname}</MemberNickname>
        <MemberGradeBadge
          gradeIcon={<MemberGradeIcon grade={memberGrade} size={14} />}
          gradeName={<MemberGradeName grade={memberGrade} size="xs" />}
        />
      </div>
    </div>
  )
}
