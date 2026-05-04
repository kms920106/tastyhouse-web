import { getPlaceInfo } from '@/actions/place'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useQuery } from '@tanstack/react-query'
import { PlaceInfoDetailSkeleton } from './PlaceInfoDetailSkeleton'
import PlaceInfoDetail from './PlaceInfoDetail'

interface Props {
  placeId: number
}

export default function PlaceInfoDetailFetcher({ placeId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-info'],
    queryFn: () => getPlaceInfo(placeId),
  })

  if (isLoading) {
    return <PlaceInfoDetailSkeleton />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('정보')} />
  }

  return <PlaceInfoDetail placeInfo={data.data} />
}
