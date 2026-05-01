import { placeRepository } from '@/domains/place/place.repository'
import PlaceDetailHeader from './PlaceDetailHeader'

interface Props {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: Props) {
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
