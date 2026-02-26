import ErrorMessage from '@/components/ui/ErrorMessage'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceInfo } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import PlaceInfoDetail, { PlaceInfoDetailSkeleton } from './PlaceInfoDetail'

interface PlaceInfoDetailFetcherProps {
  placeId: number
}

export default function PlaceInfoDetailFetcher({ placeId }: PlaceInfoDetailFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-info'],
    queryFn: () => getPlaceInfo(placeId),
  })

  if (isLoading) {
    return <PlaceInfoDetailSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('정보')}
        className="py-10 bg-white"
      />
    )
  }

  return <PlaceInfoDetail placeInfo={data.data} />
}
