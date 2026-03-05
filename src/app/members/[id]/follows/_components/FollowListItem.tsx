'use client'

import AppButton from '@/components/ui/AppButton'
import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { FollowMemberResponse } from '@/domains/follow'
import { FiMoreVertical } from 'react-icons/fi'

interface FollowListItemProps {
  member: FollowMemberResponse
  tab: 'following' | 'follower'
  onFollowToggle: (member: FollowMemberResponse) => void
  onRemoveFollower: (memberId: number) => void
}

export function FollowListItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-[9px]">
          <Skeleton className="w-24 h-3.5" />
          <Skeleton className="w-16 h-4 rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-[73px] h-[31px] rounded-[2.5px]" />
        <Skeleton className="w-8 h-8 rounded" />
      </div>
    </div>
  )
}

export default function FollowListItem({
  member,
  tab,
  onFollowToggle,
  onRemoveFollower,
}: FollowListItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={member.profileImageUrl} alt={member.nickname} />
        <div className="flex flex-col gap-[9px]">
          <MemberNickname>{member.nickname}</MemberNickname>
          <MemberGradeBadge grade={member.memberGrade} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {tab === 'follower' ? (
          <button
            onClick={() => onRemoveFollower(member.memberId)}
            className="px-5 py-2 rounded-md text-[14px] font-medium bg-white border border-gray-300 text-gray-600"
          >
            삭제
          </button>
        ) : (
          <AppButton
            onClick={() => onFollowToggle(member)}
            className={`h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px] ${
              member.following
                ? 'bg-white text-main border border-main box-border'
                : 'bg-main text-white'
            }`}
          >
            {member.following ? '팔로잉' : '팔로우'}
          </AppButton>
        )}
        <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
          <FiMoreVertical size={22} color="#999999" />
        </button>
      </div>
    </div>
  )
}
