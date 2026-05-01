'use client'

import {
  PlaceCard,
  PlaceCardContent,
  PlaceCardHeader,
  PlaceCardImage,
  PlaceCardName,
  PlaceCardRating,
  PlaceCardStation,
  PlaceCardStats,
  PlaceCardTags,
} from '@/components/places/PlaceCard'
import { getPlaceFoodTypeCodeName } from '@/domains/place/place.constants'
import type { PlaceFoodType } from '@/domains/place/place.types'

interface Props {
  id: number
  name: string
  imageUrl: string
  stationName: string
  rating: number
  reviewCount: number
  bookmarkCount: number
  foodTypes: PlaceFoodType[]
}

export default function PlaceListItem({
  id,
  name,
  imageUrl,
  stationName,
  rating,
  reviewCount,
  bookmarkCount,
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
          <PlaceCardStats reviewCount={reviewCount} bookmarkCount={bookmarkCount} />
          <PlaceCardTags tags={foodNames} variant="secondary" />
        </PlaceCardContent>
      </PlaceCard>
    </li>
  )
}
