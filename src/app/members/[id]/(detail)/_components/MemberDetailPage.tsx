'use client'

import MemberProfileCard from '@/components/member/MemberProfileCard'
import { useMemberStats, useOtherMemberProfile } from '@/domains/member/member.hook'
import MemberDetailHeader from './MemberDetailHeader'
import MemberDetailTabs from './MemberDetailTabs'
import type { MemberDetailTab } from './MemberDetailTabs'

interface Props {
  memberId: number
  isLoggedIn: boolean
  initialTab: MemberDetailTab
}

export default function MemberDetailPage({ memberId, isLoggedIn, initialTab }: Props) {
  const { data: profileData, isLoading: isProfileLoading } = useOtherMemberProfile(memberId)
  const { data: statsData, isLoading: isStatsLoading } = useMemberStats(memberId)

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MemberDetailHeader memberId={memberId} isLoggedIn={isLoggedIn} />
        <MemberProfileCard
          memberId={memberId}
          nickname={profileData?.nickname}
          profileImageUrl={profileData?.profileImageUrl}
          memberGrade={profileData?.memberGrade}
          statusMessage={profileData?.statusMessage}
          reviewCount={statsData?.reviewCount}
          followingCount={statsData?.followingCount}
          followerCount={statsData?.followerCount}
          isProfileLoading={isProfileLoading}
          isStatsLoading={isStatsLoading}
        />
      </div>
      <MemberDetailTabs memberId={memberId} initialTab={initialTab} />
    </div>
  )
}
