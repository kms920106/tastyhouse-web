import ReviewHeader from './ReviewHeader'
import ReviewTabs from '../_components/ReviewTabs'

interface Props {
  initialTab: 'all' | 'following'
}

export default function ReviewPage({ initialTab }: Props) {
  return (
    <>
      <ReviewHeader />
      <ReviewTabs initialTab={initialTab} />
      <div className="h-[70px]" />
    </>
  )
}
