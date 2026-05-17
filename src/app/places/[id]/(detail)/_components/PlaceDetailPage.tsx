import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeader from './PlaceDetailHeader'
import PlaceDetailImageGalleryContent from './PlaceDetailImageGalleryContent'
import PlaceDetailSummaryContent from './PlaceDetailSummaryContent'
import PlaceDetailTabs, { type PlaceDetailTab } from './PlaceDetailTabs'

interface Props {
  placeId: number
  initialTab: PlaceDetailTab
}

export default function PlaceDetailPage({ placeId, initialTab }: Props) {
  return (
    <>
      <PlaceDetailHeader placeId={placeId} />
      <SectionStack>
        <BorderedSection>
          <PlaceDetailImageGalleryContent placeId={placeId} />
          <PlaceDetailSummaryContent placeId={placeId} />
        </BorderedSection>
        <BorderedSection>
          <PlaceDetailTabs placeId={placeId} initialTab={initialTab} />
        </BorderedSection>
      </SectionStack>
    </>
  )
}
