'use client'

import { Event } from '@/domains/event'
import Image from 'next/image'

// TODO: API 연동 시 제거
const dummyEvents: Event[] = [
  {
    id: 1,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner1.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
  {
    id: 2,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner2.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
  {
    id: 3,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner3.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
  {
    id: 4,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner4.png',
    startDate: '2020-08-03',
    endDate: '2020-08-31',
    status: 'ongoing',
    type: 'ongoing',
  },
]

export default function OngoingEventList() {
  // TODO: API 연동
  // const { data: events, isLoading } = useQuery({
  //   queryKey: ['events', 'ongoing'],
  //   queryFn: () => getEvents({ status: 'ongoing' }),
  // })

  const events = dummyEvents

  return (
    <div className="px-[23px] py-[20px] flex flex-col gap-2.5">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white overflow-hidden cursor-pointer"
          onClick={() => (window.location.href = `/events/${event.id}`)}
        >
          <div className="relative w-full aspect-[2/1] bg-gray-100">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
          <div className="px-[16px] py-[20px]">
            <h3 className="text-[16px] text-gray-900">{event.title}</h3>
            <p className="text-[13px] leading-[13px] text-[#999999] pt-[12px]">
              {event.startDate} ~ {event.endDate}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
