import { getPlaceDetail, getPlaceInfo } from '@/actions/place'
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
    queryFn: async () => {
      const [infoRes, detailRes] = await Promise.all([
        getPlaceInfo(placeId),
        getPlaceDetail(placeId),
      ])
      return { infoRes, detailRes }
    },
  })

  if (isLoading) {
    return <PlaceInfoDetailSkeleton />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.infoRes.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('정보')} />
  }

  const placeInfo = {
    ...data.infoRes.data,
    phoneNumber: data.detailRes.data?.phoneNumber ?? null,
  }

  return <PlaceInfoDetail placeInfo={placeInfo} />
}
