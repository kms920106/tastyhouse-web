'use client'

import AppButton from '@/components/ui/AppButton'
import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MemberSearchResponse } from '@/domains/follow'
import { cn } from '@/lib/utils'

interface MemberSearchResultItemProps {
  member: MemberSearchResponse
  onFollowToggle: (member: MemberSearchResponse) => void
}

export function MemberSearchResultItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-[9px]">
          <Skeleton className="w-24 h-3.5" />
          <Skeleton className="w-16 h-4 rounded-full" />
        </div>
      </div>
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
      <div className="flex items-center gap-3">
        <Avatar src={member.profileImageUrl} alt={member.nickname} />
        <div className="flex flex-col gap-[9px]">
          <MemberNickname>{member.nickname}</MemberNickname>
          <MemberGradeBadge grade={member.memberGrade} />
        </div>
      </div>
      <AppButton
        onClick={() => onFollowToggle(member)}
        className={cn(
          'h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px]',
          member.following
            ? 'bg-main text-white'
            : 'bg-white text-main border border-main box-border',
        )}
      >
        {member.following ? '팔로잉' : '팔로우'}
      </AppButton>
    </div>
  )
}
