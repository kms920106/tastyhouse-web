import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceFilterApplyButton from './PlaceFilterApplyButton'
import PlaceFilterFacilitySection from './PlaceFilterFacilitySection'
import PlaceFilterFoodTypeSection from './PlaceFilterFoodTypeSection'
import PlaceFilterHeader from './PlaceFilterHeader'
import PlaceFilterStateProvider from './PlaceFilterStateProvider'
import PlaceFilterStationSection from './PlaceFilterStationSection'

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
          <PlaceFilterStationSection />
        </BorderedSection>
        <BorderedSection>
          <PlaceFilterFoodTypeSection />
        </BorderedSection>
        <BorderedSection>
          <PlaceFilterFacilitySection />
        </BorderedSection>
      </SectionStack>
      <FixedBottomSection className="px-[15px] py-2.5">
        <PlaceFilterApplyButton />
      </FixedBottomSection>
    </PlaceFilterStateProvider>
  )
}
