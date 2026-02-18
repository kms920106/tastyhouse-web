import EventDetailSection from './_components/EventDetailSection'

interface EventDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params

  const eventId = Number(id)

  return <EventDetailSection eventId={eventId} />
}
