import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ImageGallery from './ImageGallery'

interface PlaceImageGalleryServerProps {
  placeId: number
}

export default async function PlaceImageGalleryServer({ placeId }: PlaceImageGalleryServerProps) {
  const { data, error } = await placeRepository.getPlaceBanners(placeId)

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  const imageUrls = data.map((banner) => banner.imageUrl)

  return <ImageGallery imageUrls={imageUrls} />
}
