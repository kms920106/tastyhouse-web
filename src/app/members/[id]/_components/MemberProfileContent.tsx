'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getMemberStats, getOtherMemberProfile } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import MemberProfileHeader from './MemberProfileHeader'
import MemberProfile, { MemberProfileSectionSkeleton } from './MemberProfile'
import MemberReviewListFetcher from './MemberReviewListFetcher'

function MemberProfileContentSkeleton() {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <div className="flex-1 bg-main">
          <Skeleton className="w-full h-[55px] rounded-none" />
        </div>
        <MemberProfileSectionSkeleton />
      </div>
      <div className="border-t border-[#eeeeee]">
        <div className="sticky top-0 w-full h-[50px] bg-white border-b border-[#eeeeee]" />
      </div>
    </div>
  )
}

interface MemberProfileContentProps {
  memberId: string
}

export default function MemberProfileContent({ memberId }: MemberProfileContentProps) {
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['member', memberId, 'profile'],
    queryFn: async () => {
      const response = await getOtherMemberProfile(memberId)
      return response.data ?? null
    },
  })

  const { data: statsData, isLoading: isStatsLoading, error: statsError } = useQuery({
    queryKey: ['member', memberId, 'stats'],
    queryFn: async () => {
      const response = await getMemberStats(memberId)
      return response.data ?? null
    },
  })

  if (isProfileLoading || isStatsLoading) {
    return <MemberProfileContentSkeleton />
  }

  if (profileError || statsError || !profileData || !statsData) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('프로필')}
        className="py-10 bg-white"
      />
    )
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MemberProfileHeader memberId={profileData.id} isFollowing={profileData.isFollowing} />
        <MemberProfile profile={profileData} stats={statsData} />
      </div>
      <div className="flex-1 flex flex-col border-t border-[#eeeeee]">
        <div className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0 flex">
          <div className="flex-1 h-full flex items-center justify-center border-b-2 border-main">
            <Image src="/images/mypage/icon-review-on.png" alt="리뷰" width={22} height={25} />
          </div>
        </div>
        <div className="mt-0 flex-1 min-h-[50dvh] bg-[#f9f9f9] flex flex-col">
          <MemberReviewListFetcher memberId={profileData.id} />
        </div>
      </div>
    </div>
  )
}
