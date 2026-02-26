import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import StationSelector from './StationSelector'

export default async function StationContent() {
  const { data, error } = await placeService.getPlaceStations()

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('지하철역')} className="py-2" />
  }

  return <StationSelector stations={data} />
}
