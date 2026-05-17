import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { usePlacePhotos } from '@/domains/place/place.hook'
import { PlaceDetailPhotoListSkeleton } from './PlaceDetailPhotoListSkeleton'

interface Props {
  placeId: number
}

export default function PlaceDetailPhotoList({ placeId }: Props) {
  const { data, isLoading, error } = usePlacePhotos(placeId)

  if (isLoading) {
    return <PlaceDetailPhotoListSkeleton />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사진')} />
  }

  const categories = data.data

  return categories.map((category) => (
    <div key={category.name} className="pt-[30px]">
      <h3 className="mb-[15px] text-sm leading-[14px]">{category.name}</h3>
      <ReviewImageGallery imageUrls={category.imageUrls} />
    </div>
  ))
}
