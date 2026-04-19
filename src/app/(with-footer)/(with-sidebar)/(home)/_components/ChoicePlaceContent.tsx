import ErrorMessage from '@/components/ui/ErrorMessage'
import { Place, placeRepository } from "@/domains/place"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceContent() {
  // API 호출
  const query = {
    page: 0,
    size: 4,
  }
  const { data, error } = await placeRepository.getChoicePlaces(query)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  const places: Place[] = data.map((place) => ({
    id: place.id,
    imageUrl: place.imageUrl,
    name: place.name,
    title: place.title,
    content: place.content,
    products: place.products,
  }))

  return <ChoiceSwiper places={places} />
}
