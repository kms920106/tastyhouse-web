import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeService } from '@/domains/place/place.service'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import FoodTypeSelector from './FoodTypeSelector'

export default async function FoodTypeContent() {
  const { error, status, data } = await placeService.getPlaceFoodTypes()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('음식 종류')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <FoodTypeSelector foods={data} />
}
