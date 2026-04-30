import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import StationSelector from './StationSelector'

export default async function StationContent() {
  const { data, error } = await placeRepository.getPlaceStations()

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('지하철역')} className="py-2" />
  }

  return <StationSelector stations={data} />
}
