import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from "@/domains/place"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ImageGallery from './ImageGallery'

interface PlaceImageGalleryServerProps {
  placeId: number
}

export default async function PlaceImageGalleryServer({ placeId }: PlaceImageGalleryServerProps) {
  // API 호출
  const { data, error } = await placeRepository.getPlaceBanners(placeId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  const imageUrls = data.map((banner) => banner.imageUrl)

  return <ImageGallery imageUrls={imageUrls} />
}
