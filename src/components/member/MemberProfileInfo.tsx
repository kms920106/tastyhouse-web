'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import MemberGradeInfo from '@/components/member/MemberGradeInfo'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useOtherMemberProfile } from '@/hooks/useOtherMemberProfile'
import { ReactNode } from 'react'

interface MemberProfileInfoProps {
  memberId: number
  editSlot?: ReactNode
}

function MemberProfileInfoSkeleton({ editSlot }: { editSlot?: ReactNode }) {
  return (
    <>
      <div className="-mt-[63px] relative z-10">
        <Skeleton className="w-[125px] h-[125px] rounded-full" />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <Skeleton className="h-[16px] w-[80px]" />
        {editSlot}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Skeleton className="w-[14px] h-[14px] rounded-full" />
        <Skeleton className="h-[14px] w-[50px]" />
      </div>
      <Skeleton className="h-[14px] w-[160px] mt-[15px]" />
    </>
  )
}

export default function MemberProfileInfo({ memberId, editSlot }: MemberProfileInfoProps) {
  const { data, isLoading } = useOtherMemberProfile(memberId)

  if (isLoading) {
    return <MemberProfileInfoSkeleton editSlot={editSlot} />
  }

  const { nickname, profileImageUrl, memberGrade, statusMessage } = data ?? {}

  return (
    <>
      <div className="-mt-[63px] relative z-10">
        <ProfileImage profileImageUrl={profileImageUrl} />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <h1 className="text-base leading-[16px] font-bold">{nickname}</h1>
        {editSlot}
      </div>
      <MemberGradeInfo memberGrade={memberGrade} />
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
    </>
  )
}
