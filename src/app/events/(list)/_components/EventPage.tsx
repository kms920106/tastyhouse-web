import EventTabs from './EventTabs'
import type { EventTab } from './EventTabs'
import EventHeader from './EventHeader'

interface Props {
  initialTab: EventTab
}

export default function EventPage({ initialTab }: Props) {
  return (
    <>
      <EventHeader />
      <EventTabs initialTab={initialTab} />
    </>
  )
}
