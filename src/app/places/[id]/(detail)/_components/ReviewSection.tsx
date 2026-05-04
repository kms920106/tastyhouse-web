import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import ReviewList from './ReviewList'
import ReviewStatistic from './ReviewStatistic'

interface Props {
  placeId: number
}

export default function ReviewSection({ placeId }: Props) {
  return (
    <section>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <ReviewStatistic placeId={placeId} />
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <ReviewList placeId={placeId} />
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
