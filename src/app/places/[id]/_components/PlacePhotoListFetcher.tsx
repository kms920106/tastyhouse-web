import ReviewImageGallery, {
  ReviewImageGallerySkeleton,
} from '@/components/reviews/ReviewImageGallery'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlacePhotos } from '@/services/place'
import { useQuery } from '@tanstack/react-query'

export function PlacePhotoListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="pt-[30px]">
          <Skeleton className="mb-[15px] w-8 h-[14px]" />
          <ReviewImageGallerySkeleton />
        </div>
      ))}
    </>
  )
}

interface PlacePhotoListFetcherProps {
  placeId: number
}

export default function PlacePhotoListFetcher({ placeId }: PlacePhotoListFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-photos'],
    queryFn: () => getPlacePhotos(placeId),
  })

  if (isLoading) {
    return <PlacePhotoListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('사진')}
        className="py-10 bg-white"
      />
    )
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
