import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import StationSelector from './StationSelector'

export default async function StationContent() {
  const { error, status, data } = await placeRepository.getPlaceStations()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('지하철역')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <StationSelector stations={data} />
}
