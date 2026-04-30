import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import FacilitySelector from './FacilitySelector'

export default async function FacilityContent() {
  const { data, error } = await placeService.getPlaceAmenities()

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('편의시설')} className="py-2" />
  }

  return <FacilitySelector amenities={data} />
}
