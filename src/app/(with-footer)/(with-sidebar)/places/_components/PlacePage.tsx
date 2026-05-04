import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import PlaceContent from './PlaceContent'
import PlaceHeader from './PlaceHeader'

interface Props {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

export default function PlacePage({ stationId, foodTypes, amenities }: Props) {
  return (
    <>
      <PlaceHeader />
      <PlaceContent stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
    </>
  )
}
