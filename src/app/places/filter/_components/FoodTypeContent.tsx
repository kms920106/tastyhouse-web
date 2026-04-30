import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import FoodTypeSelector from './FoodTypeSelector'

export default async function FoodTypeContent() {
  const { data, error } = await placeService.getPlaceFoodTypes()

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-2" />
  }

  if (!data) {
    return (
      <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('음식 종류')} className="py-2" />
    )
  }

  return <FoodTypeSelector foods={data} />
}
