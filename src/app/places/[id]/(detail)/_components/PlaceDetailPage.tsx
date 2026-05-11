import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceDetailHeader from './PlaceDetailHeader'
import PlaceImageGallerySection from './PlaceImageGallerySection'
import PlaceSummarySection from './PlaceSummarySection'
import PlaceTabs from './PlaceTabs'

interface Props {
  placeId: number
  initialTab: 'info' | 'menu' | 'photo'
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
