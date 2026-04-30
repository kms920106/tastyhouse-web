import FetchErrorState from '@/components/ui/FetchErrorState'
import { Place, placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceContent() {
  const { data, error } = await placeRepository.getChoicePlaces({
    page: 0,
    size: 4,
  })

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
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
