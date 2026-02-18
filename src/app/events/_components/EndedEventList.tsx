'use client'

import { resolveImageUrl } from '@/lib/image'
import { getEventList } from '@/services/event'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export default function EndedEventList() {
  const { data, isLoading } = useQuery({
    queryKey: ['events', 'ENDED'],
    queryFn: () => getEventList('ENDED'),
  })

  const events = data?.data?.data ?? []

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[2/1] bg-gray-200" />
            <div className="px-[15px] py-5">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-3 h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`} className="cursor-pointer">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src={resolveImageUrl(event.thumbnailImageUrl)}
              alt={event.name}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
          <div className="px-[15px] py-5">
            <h3 className="text-base leading-[16px]">{event.name}</h3>
            <p className="mt-3 text-[13px] leading-[13px] text-[#999999]">
              {event.startAt.slice(0, 10)} ~ {event.endAt.slice(0, 10)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
