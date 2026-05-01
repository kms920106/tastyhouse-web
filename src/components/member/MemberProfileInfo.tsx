'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import MemberGradeInfo from '@/components/member/MemberGradeInfo'
import { useOtherMemberProfile } from '@/hooks/useOtherMemberProfile'
import { ReactNode } from 'react'
import MemberNickname from '../ui/MemberNickname'
import { MemberProfileInfoSkeleton } from './MemberProfileInfoSkeleton'

interface Props {
  memberId: number | null
  editSlot?: ReactNode
}

export default function MemberProfileInfo({ memberId, editSlot }: Props) {
  const { data, isLoading } = useOtherMemberProfile(memberId ?? undefined)

  if (!memberId || isLoading) {
    return <MemberProfileInfoSkeleton editSlot={editSlot} />
  }

  const { nickname, profileImageUrl, memberGrade, statusMessage } = data ?? {}

  return (
    <>
      <div className="-mt-[63px] relative z-10">
        <ProfileImage profileImageUrl={profileImageUrl} />
      </div>
      <div className="flex items-center gap-[1.5px] mt-[21px]">
        <MemberNickname size="lg">{nickname ?? ''}</MemberNickname>
        {editSlot}
      </div>
      <MemberGradeInfo memberGrade={memberGrade} />
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
    </>
  )
}
