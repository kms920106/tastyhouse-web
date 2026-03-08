'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { getMemberGradeColor, getMemberGradeIcon, getMemberGradeName } from '@/constants/member'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import { useMyReviewStats } from '@/hooks/useMyReviewStats'
import { cn } from '@/lib/utils'
import { PAGE_PATHS } from '@/lib/paths'
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

export default function MyPageProfile() {
  const { memberProfile, isLoading: isProfileLoading } = useMemberProfile()
  const { totalReviewCount, isLoading: isReviewStatsLoading } = useMyReviewStats()

  if (isProfileLoading || isReviewStatsLoading) {
    return <MyPageProfileSkeleton />
  }

  const { id: memberId, nickname, profileImageUrl, grade: memberGrade, statusMessage } = memberProfile ?? {}

  const gradeName = getMemberGradeName(memberGrade ?? 'NEWCOMER')
  const gradeIcon = getMemberGradeIcon(memberGrade ?? 'NEWCOMER')
  const gradeColor = getMemberGradeColor(memberGrade ?? 'NEWCOMER')

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
      <div className="flex items-center gap-1.5 mt-2">
        <div className="relative w-[14px] h-[14px]">
          <Image
            src={`/images/rank/icon-level-${gradeIcon}-40.png`}
            alt={gradeName}
            fill
            style={{ objectFit: 'contain' }}
            sizes="16px"
          />
        </div>
        <span className={cn('text-sm leading-[14px] font-bold', gradeColor)}>{gradeName}</span>
      </div>
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
      <div className="flex items-center justify-center gap-10 mt-[53px] mb-[30px]">
        <button className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">리뷰</span>
          <span className="text-xs leading-[12px] font-bold">{totalReviewCount}</span>
        </button>
        <Link href={PAGE_PATHS.MEMBER_FOLLOWS(memberId ?? '', 'following')} className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로잉</span>
          <span className="text-xs leading-[12px] font-bold">{0}</span>
        </Link>
        <Link href={PAGE_PATHS.MEMBER_FOLLOWS(memberId ?? '', 'follower')} className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로워</span>
          <span className="text-xs leading-[12px] font-bold">{0}</span>
        </Link>
      </div>
    </div>
  )
}
