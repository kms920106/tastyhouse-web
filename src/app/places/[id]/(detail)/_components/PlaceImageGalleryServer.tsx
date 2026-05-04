import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place/place.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import ImageGallery from './ImageGallery'

interface Props {
  placeId: number
}

export default async function PlaceImageGalleryServer({ placeId }: Props) {
  const { error, status, data } = await placeRepository.getPlaceBanners(placeId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const imageUrls = data.map((banner) => banner.imageUrl)

  return <ImageGallery imageUrls={imageUrls} />
}
