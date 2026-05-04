import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import PlacePage from './_components/PlacePage'

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
  const foodTypes = params.foodTypes?.split(',').filter(Boolean) as PlaceFoodType[] | undefined
  const amenities = params.amenities?.split(',').filter(Boolean) as PlaceAmenityCode[] | undefined

  return <PlacePage stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
}
