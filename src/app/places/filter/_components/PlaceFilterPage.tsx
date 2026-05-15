import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceFilterFacilityContent from './PlaceFilterFacilityContent'
import PlaceFilterFoodTypeContent from './PlaceFilterFoodTypeContent'
import PlaceFilterFooter from './PlaceFilterFooter'
import PlaceFilterHeader from './PlaceFilterHeader'
import PlaceFilterStateProvider from './PlaceFilterStateProvider'
import PlaceFilterStationContent from './PlaceFilterStationContent'

interface Props {
  stationId?: number
  foodTypes: string[]
  amenities: string[]
}

export default function PlaceFilterPage({ stationId, foodTypes, amenities }: Props) {
  return (
    <PlaceFilterStateProvider
      initialStationId={stationId}
      initialFoodTypes={foodTypes}
      initialAmenities={amenities}
    >
      <PlaceFilterHeader />
      <SectionStack>
        <BorderedSection className="border-t-0">
          <PlaceFilterStationContent />
        </BorderedSection>
        <BorderedSection>
          <PlaceFilterFoodTypeContent />
        </BorderedSection>
        <BorderedSection>
          <PlaceFilterFacilityContent />
        </BorderedSection>
      </SectionStack>
      <PlaceFilterFooter />
    </PlaceFilterStateProvider>
  )
}
