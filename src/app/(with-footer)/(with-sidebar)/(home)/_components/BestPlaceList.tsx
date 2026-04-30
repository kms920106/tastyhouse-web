import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardSkeleton,
  PlaceCardStation,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import FetchErrorState from '@/components/ui/FetchErrorState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { PlaceFoodType, getPlaceFoodTypeCodeName, placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'

export function BestPlaceListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-[25px]">
      {[...Array(4)].map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}

type PlaceListItemProps = {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  foodTypes: PlaceFoodType[]
}

function PlaceListItem({ id, name, imageUrl, stationName, rating, foodTypes }: PlaceListItemProps) {
  const foodNames = foodTypes.map((foodType) => getPlaceFoodTypeCodeName(foodType))

  return (
    <li key={id}>
      <PlaceCard placeId={id}>
        <PlaceCardImage src={imageUrl} alt={name} />
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{stationName}</PlaceCardStation>
            <PlaceCardRating value={rating} />
          </PlaceCardHeader>
          <PlaceCardName>{name}</PlaceCardName>
          <PlaceCardTags tags={foodNames} />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}

export default async function BestPlaceList() {
  const { data, error } = await placeRepository.getBestPlaces({
    page: 0,
    size: 4,
  })

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
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
