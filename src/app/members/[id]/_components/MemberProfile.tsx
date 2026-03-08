'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import MemberGradeInfo from '@/components/member/MemberGradeInfo'
import MemberProfileStats from '@/components/member/MemberProfileStats'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { getOtherMemberProfile } from '@/services/member'
import { useQuery } from '@tanstack/react-query'

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
    </div>
  )
}

interface MemberProfileProps {
  memberId: number
}

export default function MemberProfile({ memberId }: MemberProfileProps) {
  const { data: profileData } = useQuery({
    queryKey: ['member', memberId, 'profile'],
    queryFn: async () => {
      const response = await getOtherMemberProfile(memberId)
      return response.data ?? null
    },
  })

  const { nickname, profileImageUrl, memberGrade, statusMessage } = profileData ?? {}

  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10">
        <ProfileImage profileImageUrl={profileImageUrl} />
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <h1 className="text-base leading-[16px] font-bold">{nickname}</h1>
      </div>
      <MemberGradeInfo memberGrade={memberGrade} />
      {statusMessage && (
        <p className="text-sm leading-[14px] text-center mt-[15px] px-8">{statusMessage}</p>
      )}
      <MemberProfileStats memberId={memberId} />
    </div>
  )
}
