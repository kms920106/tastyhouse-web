'use client'

import { getMemberStats } from '@/actions/member'
import MemberProfileCard from '@/components/member/MemberProfileCard'
import { useOtherMemberProfile } from '@/hooks/useOtherMemberProfile'
import { useQuery } from '@tanstack/react-query'
import MemberDetailHeader from './MemberDetailHeader'
import MemberDetailTabs from './MemberDetailTabs'

interface Props {
  memberId: number
  isLoggedIn: boolean
}

export default function MemberDetailPage({ memberId, isLoggedIn }: Props) {
  const { data: profileData, isLoading: isProfileLoading } = useOtherMemberProfile(memberId)

  const { data: statsData, isLoading: isStatsLoading } = useQuery({
    queryKey: ['member', memberId, 'stats'],
    queryFn: async () => {
      const response = await getMemberStats(memberId)
      return response.data ?? null
    },
    enabled: !!memberId,
  })

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
      <MemberDetailTabs memberId={memberId} />
    </div>
  )
}
