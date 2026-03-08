'use client'

import MemberGradeInfo from '@/components/member/MemberGradeInfo'
import MemberProfileStats from '@/components/member/MemberProfileStats'
import Avatar from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MemberStatsResponse, OtherMemberProfileResponse } from '@/domains/member/member.type'

export function MemberProfileSectionSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10">
        <Skeleton className="w-[125px] h-[125px] rounded-full" />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <Skeleton className="h-[16px] w-[80px]" />
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Skeleton className="w-[14px] h-[14px] rounded-full" />
        <Skeleton className="h-[14px] w-[50px]" />
      </div>
      <Skeleton className="h-[14px] w-[160px] mt-[15px]" />
      <div className="flex items-center justify-center gap-10 mt-[53px] mb-[30px]">
        <div className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">리뷰</span>
          <Skeleton className="h-[12px] w-[16px]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로잉</span>
          <Skeleton className="h-[12px] w-[16px]" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로워</span>
          <Skeleton className="h-[12px] w-[16px]" />
        </div>
      </div>
    </div>
  )
}

interface MemberProfileProps {
  profile: OtherMemberProfileResponse
  stats: MemberStatsResponse
}

export default function MemberProfile({ profile, stats }: MemberProfileProps) {
  const { id, nickname, profileImageUrl, memberGrade, statusMessage } = profile
  const { reviewCount, followingCount, followerCount } = stats

  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10">
        <Avatar src={profileImageUrl} alt={nickname} size="bg" />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <h1 className="text-base leading-[16px] font-bold">{nickname}</h1>
      </div>
      <MemberGradeInfo memberGrade={memberGrade} />
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
      <MemberProfileStats
        memberId={id}
        reviewCount={reviewCount}
        followingCount={followingCount}
        followerCount={followerCount}
      />
    </div>
  )
}
