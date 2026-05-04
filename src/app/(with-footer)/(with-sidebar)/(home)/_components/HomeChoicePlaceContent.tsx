import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place/place.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import HomeChoiceSwiper from './HomeChoiceSwiper'

export default async function HomeChoicePlaceContent() {
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

  return <HomeChoiceSwiper places={data} />
}
