import EventTabs, { EventTabValue } from './EventTabs'
import HeaderSection from './HeaderSection'

interface Props {
  initialTab: EventTabValue
}

export default function EventPage({ initialTab }: Props) {
  return (
    <>
      <HeaderSection />
      <EventTabs initialTab={initialTab} />
    </>
  )
}
