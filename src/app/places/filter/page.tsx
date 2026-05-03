import SectionStack from '@/components/ui/SectionStack'
import FacilitySection from './_components/FacilitySection'
import FilterApplyButtonWrapper from './_components/FilterApplyButtonWrapper'
import FilterHeaderWrapper from './_components/FilterHeaderWrapper'
import FilterStateProvider from './_components/FilterStateProvider'
import FoodTypeSection from './_components/FoodTypeSection'
import StationSection from './_components/StationSection'

interface Props {
  searchParams: Promise<{
    stationId?: string
    foodTypes?: string
    amenities?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const stationId = params.stationId ? Number(params.stationId) : undefined
  const foodTypes = params.foodTypes?.split(',').filter(Boolean) ?? []
  const amenities = params.amenities?.split(',').filter(Boolean) ?? []

  return (
    <FilterStateProvider
      initialStationId={stationId}
      initialFoodTypes={foodTypes}
      initialAmenities={amenities}
    >
      <FilterHeaderWrapper />
      <SectionStack>
        <StationSection />
        <FoodTypeSection />
        <FacilitySection />
      </SectionStack>
      <FilterApplyButtonWrapper />
    </FilterStateProvider>
  )
}
