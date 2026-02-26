import { placeService } from '@/domains/place'
import PlaceDetailHeader from './PlaceDetailHeader'

interface PlaceDetailHeaderServerProps {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: PlaceDetailHeaderServerProps) {
  // API 호출
  const { error, data } = await placeService.getPlaceName(placeId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <div>-</div>
  }

  const { name } = data.data

  return <PlaceDetailHeader name={name} />
}
