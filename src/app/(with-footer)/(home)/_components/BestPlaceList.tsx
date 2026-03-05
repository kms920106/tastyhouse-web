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
import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { getPlaceFoodTypeCodeName } from '@/constants/place'
import { PlaceFoodType, placeRepository } from "@/domains/place"
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
  // API 호출
  const query = {
    page: 0,
    size: 4,
  }
  const { data, error } = await placeRepository.getBestPlaces(query)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
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
