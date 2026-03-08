import { PAGE_PATHS } from '@/lib/paths'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { getMemberStats } from '@/services/member'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ReactNode } from 'react'

interface MemberProfileStatsProps {
  memberId: number | string
}

function StatLabel({ children }: { children: ReactNode }) {
  return <span className="text-xs leading-[12px]">{children}</span>
}

function StatValue({ children }: { children: ReactNode }) {
  return <span className="text-xs leading-[12px] font-bold">{children}</span>
}

function MemberProfileStatsSkeleton() {
  return (
    <div className="flex items-center justify-center gap-10 mt-[53px] mb-[30px]">
      <div className="flex items-center gap-1">
        <StatLabel>리뷰</StatLabel>
        <Skeleton className="h-[12px] w-[16px]" />
      </div>
      <div className="flex items-center gap-1">
        <StatLabel>팔로잉</StatLabel>
        <Skeleton className="h-[12px] w-[16px]" />
      </div>
      <div className="flex items-center gap-1">
        <StatLabel>팔로워</StatLabel>
        <Skeleton className="h-[12px] w-[16px]" />
      </div>
    </div>
  )
}

export default function MemberProfileStats({ memberId }: MemberProfileStatsProps) {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['member', memberId, 'stats'],
    queryFn: async () => {
      const response = await getMemberStats(memberId)
      return response.data ?? null
    },
    enabled: !!memberId,
  })

  if (isLoading) {
    return <MemberProfileStatsSkeleton />
  }

  const { reviewCount, followingCount, followerCount } = statsData ?? {}

  return (
    <div className="flex items-center justify-center gap-10 mt-[53px] mb-[30px]">
      <div className="flex items-center gap-1">
        <StatLabel>리뷰</StatLabel>
        <StatValue>{reviewCount}</StatValue>
      </div>
      <Link
        href={PAGE_PATHS.MEMBER_FOLLOWS(memberId, 'following')}
        className="flex items-center gap-1"
      >
        <StatLabel>팔로잉</StatLabel>
        <StatValue>{followingCount}</StatValue>
      </Link>
      <Link
        href={PAGE_PATHS.MEMBER_FOLLOWS(memberId, 'follower')}
        className="flex items-center gap-1"
      >
        <StatLabel>팔로워</StatLabel>
        <StatValue>{followerCount}</StatValue>
      </Link>
    </div>
  )
}
