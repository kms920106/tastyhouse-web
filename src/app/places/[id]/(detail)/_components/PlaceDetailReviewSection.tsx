import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailReviewStatistic from './PlaceDetailReviewStatistic'
import PlaceDetailReviewListContent from './PlaceDetailReviewListContent'

interface Props {
  placeId: number
}

export default function PlaceDetailReviewContent({ placeId }: Props) {
  return (
    <SectionStack>
      <BorderedSection>
        <PlaceDetailReviewStatistic placeId={placeId} />
      </BorderedSection>
      <BorderedSection>
        <PlaceDetailReviewListContent placeId={placeId} />
      </BorderedSection>
    </SectionStack>
  )
}
