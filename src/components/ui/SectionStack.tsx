import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionStackProps {
  children: ReactNode
  className?: string
}

export default function SectionStack({ children, className = '' }: SectionStackProps) {
  return <div className={cn('flex flex-col gap-2.5 bg-[#f9f9f9]', className)}>{children}</div>
}
