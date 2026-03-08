'use client'

import { formatTimeAgo } from '@/lib/date'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface TimeAgoProps {
  date: string
  className?: string
}

export default function TimeAgo({ date, className = '' }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    setTimeAgo(formatTimeAgo(date))
  }, [date])

  return <p className={cn('text-xs leading-[12px] text-[#999999]', className)}>{timeAgo}</p>
}
