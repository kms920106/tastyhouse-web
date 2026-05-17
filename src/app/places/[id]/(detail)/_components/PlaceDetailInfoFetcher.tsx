import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { usePlaceInfoDetail } from '@/domains/place/place.hook'
import { PlaceDetailInfoSkeleton } from './PlaceDetailInfoSkeleton'
import PlaceDetailInfo from './PlaceDetailInfo'

interface Props {
  placeId: number
}

export default function PlaceDetailInfoFetcher({ placeId }: Props) {
  const { data, isLoading, error } = usePlaceInfoDetail(placeId)

  if (isLoading) {
    return <PlaceDetailInfoSkeleton />
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

  return <PlaceDetailInfo placeInfo={placeInfo} />
}
