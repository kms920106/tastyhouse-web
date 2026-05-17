import PlaceImageGallery from '@/components/places/PlaceImageGallery'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { placeRepository } from '@/domains/place/place.repository'

interface Props {
  placeId: number
}

export default async function PlaceDetailImageGalleryServer({ placeId }: Props) {
  const { error, status, data } = await placeRepository.getPlaceBanners(placeId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const imageUrls = data.map((banner) => banner.imageUrl)

  return <PlaceImageGallery imageUrls={imageUrls} />
}
