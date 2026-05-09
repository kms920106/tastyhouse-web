import { placeRepository } from '@/domains/place/place.repository'
import ShareButtonClient from './ShareButtonClient'
import ShareButtonError from './ShareButtonError'

interface Props {
  placeId: number
}

export default async function ShareButtonServer({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceDetail(placeId)

  if (error) {
    return <ShareButtonError />
  }

  if (!data) {
    return <ShareButtonError />
  }

  const { name } = data

  return <ShareButtonClient placeId={placeId} placeName={name} />
}
