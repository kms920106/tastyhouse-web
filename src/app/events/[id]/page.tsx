import { Suspense } from 'react'
import EventDetailSection from './_components/EventDetailSection'
import EventDetailSectionSkeleton from './_components/EventDetailSectionSkeleton'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const eventId = Number(id)

  return (
    <Suspense fallback={<EventDetailSectionSkeleton />}>
      <EventDetailSection eventId={eventId} />
    </Suspense>
  )
}
