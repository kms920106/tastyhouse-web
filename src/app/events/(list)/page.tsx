import EventPage from './_components/EventPage'
import { EventTabValue } from './_components/EventTabs'

interface Props {
  searchParams: Promise<{
    tab?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { tab } = await searchParams
  const initialTab = (tab || 'ongoing') as EventTabValue

  return <EventPage initialTab={initialTab} />
}
