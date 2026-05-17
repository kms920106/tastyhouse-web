import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeader from './PlaceDetailHeader'
import PlaceImageGallerySection from './PlaceImageGallerySection'
import PlaceSummarySection from './PlaceSummarySection'
import PlaceTabs, { type PlaceTab } from './PlaceTabs'

interface Props {
  placeId: number
  initialTab: PlaceTab
}

export default function PlaceDetailPage({ placeId, initialTab }: Props) {
  return (
    <>
      <PlaceDetailHeader placeId={placeId} />
      <SectionStack>
        <BorderedSection>
          <PlaceImageGallerySection placeId={placeId} />
          <PlaceSummarySection placeId={placeId} />
        </BorderedSection>
        <PlaceTabs placeId={placeId} initialTab={initialTab} />
      </SectionStack>
    </>
  )
}
