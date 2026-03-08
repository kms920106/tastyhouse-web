import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'text-xs leading-[12px]',
  md: 'text-sm leading-[14px]',
  lg: 'text-base leading-[16px]',
} as const

interface MemberNicknameProps {
  children: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  truncate?: boolean
}

export default function MemberNickname({
  children,
  size = 'md',
  className = '',
  truncate = true,
}: MemberNicknameProps) {
  return (
    <p className={cn('font-bold', sizeMap[size], truncate && 'truncate', className)}>
      {children}
    </p>
  )
}
