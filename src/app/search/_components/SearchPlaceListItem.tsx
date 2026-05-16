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
import { getPlaceFoodTypeCodeName } from '@/domains/place/place.constants'
import type { SearchPlaceItem } from '@/domains/search/search.model'

interface Props {
  item: SearchPlaceItem
}

export default function SearchPlaceListItem({ item }: Props) {
  const { id, name, stationName, rating, imageUrl, foodTypes } = item
  const foodNames = foodTypes.map(getPlaceFoodTypeCodeName)

  return (
    <li>
      <PlaceCard placeId={id}>
        {imageUrl && <PlaceCardImage src={imageUrl} alt={name} />}
        <PlaceCardContent>
          <PlaceCardHeader>
            <PlaceCardStation>{stationName}</PlaceCardStation>
            <PlaceCardRating value={rating} />
          </PlaceCardHeader>
          <PlaceCardName>{name}</PlaceCardName>
          <PlaceCardTags tags={foodNames} variant="secondary" />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}
