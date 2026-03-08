import { PlaceAmenityCode, PlaceFoodType } from '@/domains/place'
import PlaceListSection from './_components/PlaceListSection'

interface PlacePageProps {
  searchParams: Promise<{
    stationId?: string
    foodTypes?: string
    amenities?: string
  }>
}

export default async function PlacePage({ searchParams }: PlacePageProps) {
  const params = await searchParams

  const stationId = params.stationId ? Number(params.stationId) : undefined
  const foodTypes = params.foodTypes?.split(',').filter(Boolean) as PlaceFoodType[] | undefined
  const amenities = params.amenities?.split(',').filter(Boolean) as PlaceAmenityCode[] | undefined

  return <PlaceListSection stationId={stationId} foodTypes={foodTypes} amenities={amenities} />
}
