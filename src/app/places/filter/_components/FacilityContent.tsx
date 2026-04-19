import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import FacilitySelector from './FacilitySelector'

export default async function FacilityContent() {
  const { data, error } = await placeService.getPlaceAmenities()

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('편의시설')} className="py-2" />
  }

  return <FacilitySelector amenities={data} />
}
