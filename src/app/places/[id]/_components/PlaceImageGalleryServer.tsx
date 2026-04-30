import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ImageGallery from './ImageGallery'

interface PlaceImageGalleryServerProps {
  placeId: number
}

export default async function PlaceImageGalleryServer({ placeId }: PlaceImageGalleryServerProps) {
  // API 호출
  const { data, error } = await placeRepository.getPlaceBanners(placeId)

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  const imageUrls = data.map((banner) => banner.imageUrl)

  return <ImageGallery imageUrls={imageUrls} />
}
