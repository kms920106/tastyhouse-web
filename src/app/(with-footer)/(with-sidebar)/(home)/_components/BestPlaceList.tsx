import FetchErrorState from '@/components/ui/FetchErrorState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { placeRepository } from '@/domains/place/place.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { PlaceListItem } from './BestPlaceListItem'

export default async function BestPlaceList() {
  const { error, status, data } = await placeRepository.getBestPlaces({
    page: 0,
    size: 4,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.length === 0) {
    return null
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10 mb-10">
        {data.map((place) => (
          <PlaceListItem
            key={place.id}
            id={place.id}
            name={place.name}
            imageUrl={place.imageUrl}
            stationName={place.stationName}
            rating={place.rating}
            foodTypes={place.foodTypes}
          />
        ))}
      </ul>
      <div className="flex justify-center">
        <ViewMoreButton href="/places/best-places" />
      </div>
    </>
  )
}
