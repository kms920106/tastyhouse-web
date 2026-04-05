import { eventRepository } from "@/domains/event"
import Image from 'next/image'
import HeaderSection from './HeaderSection'

interface EventDetailSectionProps {
  eventId: number
}

export default async function EventDetailSection({ eventId }: EventDetailSectionProps) {
  const { data } = await eventRepository.getEventDetail(eventId)

  return (
    <>
      <HeaderSection />
      {data && (
        <Image
          src={data.bannerImageUrl}
          alt="이벤트 배너"
          width={1080}
          height={1436}
          className="w-full h-auto"
        />
      )}
    </>
  )
}
