'use client'

import AppButton from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

/**
 * filled (default): 팔로잉=채워진(main), 팔로우=아웃라인 — 검색 결과 등
 * outlined: 팔로잉=아웃라인, 팔로우=채워진(main) — 팔로잉 목록 등
 */
type FollowButtonVariant = 'filled' | 'outlined'

interface FollowButtonProps {
  following: boolean
  onClick: () => void
  variant?: FollowButtonVariant
  className?: string
}

export default function FollowButton({
  following,
  onClick,
  variant = 'filled',
  className,
}: FollowButtonProps) {
  const isHighlighted = variant === 'filled' ? following : !following

  return (
    <AppButton
      onClick={onClick}
      className={cn(
        'h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px]',
        isHighlighted
          ? 'bg-main text-white'
          : 'bg-white text-main border border-main box-border',
        className,
      )}
    >
      {following ? '팔로잉' : '팔로우'}
    </AppButton>
  )
}
