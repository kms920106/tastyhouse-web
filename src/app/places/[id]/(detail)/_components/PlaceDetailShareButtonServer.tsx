import { placeRepository } from '@/domains/place/place.repository'
import PlaceDetailShareButtonClient from './PlaceDetailShareButtonClient'
import PlaceDetailShareButtonError from './PlaceDetailShareButtonError'

interface Props {
  placeId: number
}

export default async function PlaceDetailShareButtonServer({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceDetail(placeId)

  if (error) {
    return <PlaceDetailShareButtonError />
  }

  if (!data) {
    return <PlaceDetailShareButtonError />
  }

  const { name } = data

  return <PlaceDetailShareButtonClient placeId={placeId} placeName={name} />
}
