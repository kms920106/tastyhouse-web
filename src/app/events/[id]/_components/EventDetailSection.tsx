import { eventService } from '@/domains/event'
import { resolveImageUrl } from '@/lib/image'
import Image from 'next/image'
import HeaderSection from './HeaderSection'

interface EventDetailSectionProps {
  eventId: number
}

export default async function EventDetailSection({ eventId }: EventDetailSectionProps) {
  const { data } = await eventService.getEventDetail(eventId)

  return (
    <>
      <HeaderSection />
      {data && (
        <Image
          src={resolveImageUrl(data.bannerImageUrl)}
          alt="이벤트 배너"
          width={1080}
          height={1436}
          className="w-full h-auto"
        />
      )}
    </>
  )
}
