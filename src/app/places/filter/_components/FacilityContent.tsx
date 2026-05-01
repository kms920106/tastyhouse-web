import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeService } from '@/domains/place/place.service'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import FacilitySelector from './FacilitySelector'

export default async function FacilityContent() {
  const { error, status, data } = await placeService.getPlaceAmenities()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('편의시설')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <FacilitySelector amenities={data} />
}
