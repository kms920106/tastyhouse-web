import EventSection from './_components/EventSection'

interface EventsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const initialTab = (params.tab || 'ongoing') as 'ongoing' | 'ended' | 'winner'

  return <EventSection initialTab={initialTab} />
}
