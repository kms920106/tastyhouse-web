import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import PlaceListContent from './PlaceListContent'

interface Props {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export default function PlaceListSection({
  stationId,
  foodTypes,
  amenities,
}: Props) {
  return (
    <section>
      <PlaceListContent stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
    </section>
  )
}
