import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import PlaceListContent from './PlaceListContent'

interface PlaceListSectionProps {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export default function PlaceListSection({
  stationId,
  foodTypes,
  amenities,
}: PlaceListSectionProps) {
  return (
    <section>
      <PlaceListContent stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
    </section>
  )
}
