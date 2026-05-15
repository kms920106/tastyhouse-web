import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeService } from '@/domains/place/place.service'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import PlaceFilterFoodTypeSelector from './PlaceFilterFoodTypeSelector'

export default async function PlaceFilterFoodTypeSelectorFetcher() {
  const { error, status, data } = await placeService.getPlaceFoodTypes()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('음식 종류')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return <PlaceFilterFoodTypeSelector foods={data} />
}
