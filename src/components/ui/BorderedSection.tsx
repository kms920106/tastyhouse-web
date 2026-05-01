import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function BorderedSection({ children, className = '' }: Props) {
  return (
    <section className={cn('bg-white border-y border-[#eeeeee] box-border', className)}>
      {children}
    </section>
  )
}
