import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface FixedBottomSectionProps {
  children: ReactNode
  className?: string
}

export default function FixedBottomSection({ children, className = '' }: FixedBottomSectionProps) {
  return (
    <section
      className={cn('fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border', className)}
    >
      {children}
    </section>
  )
}
