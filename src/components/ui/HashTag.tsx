import { cn } from '@/lib/utils'
import * as React from 'react'

export interface HashTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

const variantStyles = {
  primary: 'bg-white',
  secondary: 'bg-[#f9f9f9]',
}

const sizeStyles = {
  sm: 'text-[10px] leading-[10px] rounded-[12.5px]',
  md: 'text-[12px] leading-[12px] rounded-[15px]',
}

export default function HashTag({
  tag,
  variant = 'primary',
  size = 'sm',
  className,
  children,
  ...props
}: HashTagProps) {
  return (
    <span
      className={cn(
        'flex-shrink-0 inline-flex items-center px-[11px] py-[8px] text-[#666666] whitespace-nowrap border border-[#eeeeee] box-border',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      #{tag}
      {children}
    </span>
  )
}
