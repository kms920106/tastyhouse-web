'use client'

import type { MemberGradeCode } from '@/domains/member'
import { ReactNode } from 'react'
import MemberProfileInfo from './MemberProfileInfo'
import { MemberProfileInfoSkeleton } from './MemberProfileInfoSkeleton'
import MemberProfileStats from './MemberProfileStats'
import { MemberProfileStatsSkeleton } from './MemberProfileStatsSkeleton'

interface Props {
  memberId: number
  nickname?: string
  profileImageUrl?: string | null
  memberGrade?: MemberGradeCode
  statusMessage?: string | null
  reviewCount?: number
  followingCount?: number
  followerCount?: number
  isProfileLoading?: boolean
  isStatsLoading?: boolean
  editSlot?: ReactNode
}

export default function MemberProfileCard({
  memberId,
  nickname,
  profileImageUrl,
  memberGrade,
  statusMessage,
  reviewCount,
  followingCount,
  followerCount,
  isProfileLoading,
  isStatsLoading,
  editSlot,
}: Props) {
  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      {isProfileLoading || !nickname ? (
        <MemberProfileInfoSkeleton editSlot={editSlot} />
      ) : (
        <MemberProfileInfo
          nickname={nickname}
          profileImageUrl={profileImageUrl ?? null}
          memberGrade={memberGrade}
          statusMessage={statusMessage}
          editSlot={editSlot}
        />
      )}
      {isStatsLoading || reviewCount === undefined ? (
        <MemberProfileStatsSkeleton />
      ) : (
        <MemberProfileStats
          memberId={memberId}
          reviewCount={reviewCount}
          followingCount={followingCount}
          followerCount={followerCount}
        />
      )}
    </div>
  )
}
