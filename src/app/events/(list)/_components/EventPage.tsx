import EventTabs, { EventTabValue } from './EventTabs'
import EventHeader from './EventHeader'

interface Props {
  initialTab: EventTabValue
}

export default function EventPage({ initialTab }: Props) {
  return (
    <>
      <EventHeader />
      <EventTabs initialTab={initialTab} />
    </>
  )
}
