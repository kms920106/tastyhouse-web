'use client'

import AppButton from '@/components/ui/AppButton'
import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { FollowMemberResponse } from '@/domains/follow'
import { cn } from '@/lib/utils'
import { useState } from 'react'
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
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false)

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
          <>
            <AppOutlineButton
              onClick={() => setRemoveConfirmOpen(true)}
              className="h-[30px] px-7 py-2.5 text-xs leading-[12px] bg-[#eeeeee] border border-[#cccccc] box-border rounded-[2.5px]"
            >
              삭제
            </AppOutlineButton>
            <AppConfirmDialog
              open={removeConfirmOpen}
              onOpenChange={setRemoveConfirmOpen}
              title="팔로워를 삭제하시겠습니까?"
              description={`${member.nickname}님을 팔로워 목록에서 삭제합니다.\n삭제 후에는 해당 팔로워 관계가 해제됩니다.`}
              confirmLabel="삭제"
              cancelLabel="취소"
              onConfirm={() => onRemoveFollower(member.memberId)}
            />
          </>
        ) : (
          <>
            <AppButton
              onClick={() => onFollowToggle(member)}
              className={cn(
                'h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px]',
                member.following
                  ? 'bg-white text-main border border-main box-border'
                  : 'bg-main text-white',
              )}
            >
              {member.following ? '팔로잉' : '팔로우'}
            </AppButton>
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <FiMoreVertical size={22} color="#999999" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
