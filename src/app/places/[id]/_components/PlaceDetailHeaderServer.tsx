import { placeRepository } from '@/domains/place'
import PlaceDetailHeader from './PlaceDetailHeader'

interface PlaceDetailHeaderServerProps {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: PlaceDetailHeaderServerProps) {
  // API 호출
  const { error, data } = await placeRepository.getPlaceName(placeId)

  if (error) {
    return <div>-</div>
  }

  if (!data) {
    return <div>-</div>
  }

  const { name } = data

  return <PlaceDetailHeader name={name} />
}
