import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MemberGradeCode } from '@/domains/member'

interface MemberProfileCellProps {
  nickname: string
  memberGrade: MemberGradeCode
  profileImageUrl: string | null
}

export function MemberProfileCellSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-[9px]">
        <Skeleton className="w-24 h-3.5" />
        <Skeleton className="w-16 h-4 rounded-full" />
      </div>
    </div>
  )
}

export default function MemberProfileCell({
  nickname,
  memberGrade,
  profileImageUrl,
}: MemberProfileCellProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={profileImageUrl} alt={nickname} />
      <div className="flex flex-col gap-[9px]">
        <MemberNickname>{nickname}</MemberNickname>
        <MemberGradeBadge grade={memberGrade} />
      </div>
    </div>
  )
}
