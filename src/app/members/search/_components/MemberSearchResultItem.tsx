'use client'

import FollowButton from '@/components/ui/FollowButton'
import MemberProfileCell, { MemberProfileCellSkeleton } from '@/components/ui/MemberProfileCell'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MemberSocialResponse } from '@/domains/follow'

interface MemberSearchResultItemProps {
  member: MemberSocialResponse
  onFollowToggle: (member: MemberSocialResponse) => void
}

export function MemberSearchResultItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <MemberProfileCellSkeleton />
      <Skeleton className="w-[73px] h-[31px] rounded-[2.5px]" />
    </div>
  )
}

export default function MemberSearchResultItem({
  member,
  onFollowToggle,
}: MemberSearchResultItemProps) {
  return (
    <div className="flex items-center justify-between">
      <MemberProfileCell
        nickname={member.nickname}
        memberGrade={member.memberGrade}
        profileImageUrl={member.profileImageUrl}
      />
      <FollowButton following={member.following} onClick={() => onFollowToggle(member)} />
    </div>
  )
}
