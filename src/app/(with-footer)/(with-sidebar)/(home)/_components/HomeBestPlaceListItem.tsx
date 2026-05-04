import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardStation,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import { PlaceFoodType, getPlaceFoodTypeCodeName } from '@/domains/place'

type Props = {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  foodTypes: PlaceFoodType[]
}

export function HomeBestPlaceListItem({
  id,
  name,
  imageUrl,
  stationName,
  rating,
  foodTypes,
}: Props) {
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
