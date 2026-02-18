'use client'

import { getEventAnnouncementList } from '@/services/event'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { useQuery } from '@tanstack/react-query'

export default function WinnerEventList() {
  const { data, isLoading } = useQuery({
    queryKey: ['events', 'announcements'],
    queryFn: () => getEventAnnouncementList(),
  })

  const events = data?.data?.data ?? []

  if (isLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`px-[16px] py-[18px] animate-pulse border-b border-[#eeeeee] last:border-b-0 ${i === 0 ? 'pt-0' : ''}`}
          >
            <div className="h-3.5 bg-gray-200 rounded w-3/4" />
            <div className="mt-3 h-3 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <AccordionPrimitive.Root type="multiple">
      {events.map((event, index) => (
        <AccordionPrimitive.Item
          key={event.id}
          value={String(event.id)}
          className="border-b border-[#eeeeee] last:border-b-0"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={`w-full flex items-start justify-between px-[16px] py-[18px] ${index === 0 ? 'pt-0' : ''} [&[data-state=open]>img]:rotate-180 group`}
            >
              <div className="flex flex-col items-start gap-3">
                <span className="text-sm leading-[14px]">{event.name}</span>
                <span className="text-[13px] leading-[13px] text-[#999999]">
                  {event.announcedAt.slice(0, 10)}
                </span>
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <p className="text-[13px] leading-[22px] p-[25px] whitespace-pre-line bg-[#f9f9f9]">
              {event.content}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
