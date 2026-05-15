import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place/place.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import PlaceFilterStationSelector from './PlaceFilterStationSelector'

export default async function PlaceFilterStationContent() {
  const { error, status, data } = await placeRepository.getPlaceStations()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('지하철역')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <PlaceFilterStationSelector stations={data} />
}
