'use client'

import MemberProfileImage from '@/components/members/MemberProfileImage'
import MemberProfileCard from '@/components/members/MemberProfileCard'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import PenIcon from '@/components/ui/PenIcon'
import { useMemberProfile, useMemberStats } from '@/domains/member/member.hook'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  isLoggedIn: boolean
}

export default function MyPageProfile({ isLoggedIn }: Props) {
  const { memberProfile, isLoading: isProfileLoading } = useMemberProfile({ enabled: isLoggedIn })
  const { data: statsData, isLoading: isStatsLoading } = useMemberStats(memberProfile?.id)

  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex flex-col items-center bg-white">
        <div className="-mt-[63px] relative z-10">
          <MemberProfileImage profileImageUrl={null} />
        </div>
        <AppPrimaryButton asChild className="w-auto px-10 mt-[21px]">
          <Link href={PAGE_PATHS.AUTH_LOGIN}>로그인하기</Link>
        </AppPrimaryButton>
      </div>
    )
  }

  return (
    <MemberProfileCard
      memberId={memberProfile?.id ?? 0}
      nickname={memberProfile?.nickname}
      profileImageUrl={memberProfile?.profileImageUrl}
      memberGrade={memberProfile?.grade}
      statusMessage={memberProfile?.statusMessage}
      reviewCount={statsData?.reviewCount}
      followingCount={statsData?.followingCount}
      followerCount={statsData?.followerCount}
      isProfileLoading={isProfileLoading}
      isStatsLoading={isStatsLoading}
      editSlot={
        <Link href={PAGE_PATHS.ACCOUNT_PROFILE}>
          <PenIcon />
        </Link>
      }
    />
  )
}
