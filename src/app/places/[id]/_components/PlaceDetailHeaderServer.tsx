import { placeRepository } from '@/domains/place'
import PlaceDetailHeader from './PlaceDetailHeader'

interface PlaceDetailHeaderServerProps {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: PlaceDetailHeaderServerProps) {
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
