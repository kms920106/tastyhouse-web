'use client'

import { FacilityButton } from '@/components/places/FacilityItem'
import { FacilitySelectorLayout } from '@/components/places/FacilitySelectorLayout'
import { PlaceAmenity } from '@/domains/place/place.model'
import { usePlaceFilterState } from './PlaceFilterStateProvider'

interface Props {
  amenities: PlaceAmenity[]
}

export default function PlaceFilterFacilitySelector({ amenities }: Props) {
  const { selectedAmenities, toggleAmenity } = usePlaceFilterState()

  return (
    <FacilitySelectorLayout>
      {amenities.map((amenity: PlaceAmenity) => {
        const isSelected = selectedAmenities.includes(amenity.code)
        return (
          <FacilityButton
            key={amenity.code}
            amenity={amenity}
            isSelected={isSelected}
            onClick={() => toggleAmenity(amenity.code)}
          />
        )
      })}
    </FacilitySelectorLayout>
  )
}
