import FetchErrorState from '@/components/ui/FetchErrorState'
import { Place, placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ChoiceSwiper from './ChoiceSwiper'

export default async function ChoicePlaceContent() {
  const { error, status, data } = await placeRepository.getChoicePlaces({
    page: 0,
    size: 4,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
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
