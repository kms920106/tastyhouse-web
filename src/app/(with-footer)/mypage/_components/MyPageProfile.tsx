'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import MemberGradeInfo from '@/components/member/MemberGradeInfo'
import MemberProfileStats from '@/components/member/MemberProfileStats'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import { getOtherMemberProfile } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

function MyPageProfileSkeleton() {
  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10">
        <Skeleton className="w-[125px] h-[125px] rounded-full" />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <Skeleton className="h-[16px] w-[80px]" />
        <Skeleton className="w-[18px] h-[16px]" />
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Skeleton className="w-[14px] h-[14px] rounded-full" />
        <Skeleton className="h-[14px] w-[50px]" />
      </div>
      <Skeleton className="h-[14px] w-[160px] mt-[15px]" />
    </div>
  )
}

export default function MyPageProfile() {
  const { memberProfile, isLoading: isProfileLoading } = useMemberProfile()

  const memberId = memberProfile?.id

  const { data: otherProfileData, isLoading: isOtherProfileLoading } = useQuery({
    queryKey: ['member', 'profile', memberId],
    queryFn: () => getOtherMemberProfile(memberId!),
    enabled: !!memberId,
  })

  if (isProfileLoading || isOtherProfileLoading) {
    return <MyPageProfileSkeleton />
  }

  const { nickname, profileImageUrl, memberGrade, statusMessage } = otherProfileData?.data ?? {}

  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10">
        <ProfileImage profileImageUrl={profileImageUrl} />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <h1 className="text-base leading-[16px] font-bold">{nickname}</h1>
        <Link href="/account/profile">
          <Image src="/images/mypage/icon-pen.png" alt="pencil" width={18} height={16} />
        </Link>
      </div>
      <MemberGradeInfo memberGrade={memberGrade} />
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
      <MemberProfileStats memberId={memberId ?? ''} />
    </div>
  )
}
