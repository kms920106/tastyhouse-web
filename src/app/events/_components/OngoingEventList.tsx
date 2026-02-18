import { Event } from '@/domains/event'
import Image from 'next/image'
import Link from 'next/link'

// TODO: API 연동 시 제거
const dummyEvents: Event[] = [
  {
    id: 1,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner5.png',
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
  {
    id: 4,
    title: '8월 신규회원 특별 할인 이벤트',
    imageUrl: '/images/sample/event/banner1.png',
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
    <div className="flex flex-col gap-2.5">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`} className="cursor-pointer">
          <div className="relative w-full aspect-[2/1]">
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
          <div className="px-[15px] py-5">
            <h3 className="text-base leading-[16px]">{event.title}</h3>
            <p className="mt-3 text-[13px] leading-[13px] text-[#999999]">
              {event.startDate} ~ {event.endDate}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
