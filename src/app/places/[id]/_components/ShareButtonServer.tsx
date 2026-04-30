import { placeRepository } from '@/domains/place'
import ShareButtonClient from './ShareButtonClient'
import ShareButtonError from './ShareButtonError'

interface ShareButtonServerProps {
  placeId: number
}

export default async function ShareButtonServer({ placeId }: ShareButtonServerProps) {
  const { error, data } = await placeRepository.getPlaceName(placeId)

  if (error) {
    return <ShareButtonError />
  }

  if (!data) {
    return <ShareButtonError />
  }

  const { name } = data

  return <ShareButtonClient placeId={placeId} placeName={name} />
}
