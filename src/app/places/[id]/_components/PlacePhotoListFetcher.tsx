import { getPlacePhotos } from '@/actions/place'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import { PlacePhotoListSkeleton } from './PlacePhotoListSkeleton'

interface Props {
  placeId: number
}

export default function PlacePhotoListFetcher({ placeId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-photos'],
    queryFn: () => getPlacePhotos(placeId),
  })

  if (isLoading) {
    return <PlacePhotoListSkeleton />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사진')} />
  }

  const categories = data.data

  return (
    <div>
      {categories.map((category) => (
        <div key={category.name} className="pt-[30px]">
          <h3 className="mb-[15px] text-sm leading-[14px]">{category.name}</h3>
          <ReviewImageGallery imageUrls={category.imageUrls} />
        </div>
      ))}
    </div>
  )
}
