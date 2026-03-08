'use client'

import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import FollowButton from '@/components/ui/FollowButton'
import MemberProfileCell, { MemberProfileCellSkeleton } from '@/components/ui/MemberProfileCell'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MemberSocialResponse } from '@/domains/follow'
import { useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'

interface FollowListItemProps {
  member: MemberSocialResponse
  tab: 'following' | 'follower'
  onFollowToggle: (member: MemberSocialResponse) => void
  onRemoveFollower: (memberId: number) => void
}

export function FollowListItemSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <MemberProfileCellSkeleton />
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
      <MemberProfileCell
        nickname={member.nickname}
        memberGrade={member.memberGrade}
        profileImageUrl={member.profileImageUrl}
      />
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
            <FollowButton
              following={member.following}
              onClick={() => onFollowToggle(member)}
            />
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
              <FiMoreVertical size={22} color="#999999" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
