import ErrorMessage from '@/components/ui/ErrorMessage'
import { Place, placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceContent() {
  // API 호출
  const query = {
    page: 0,
    size: 4,
  }
  const { data, error } = await placeRepository.getChoicePlaces(query)

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

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
