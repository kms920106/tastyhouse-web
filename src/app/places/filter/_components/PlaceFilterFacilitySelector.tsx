'use client'

import { FacilityButton } from '@/components/places/FacilityItem'
import { PlaceAmenity } from '@/domains/place/place.model'
import { usePlaceFilterState } from './PlaceFilterStateProvider'

interface Props {
  amenities: PlaceAmenity[]
}

export default function PlaceFilterFacilitySelector({ amenities }: Props) {
  const { selectedAmenities, toggleAmenity } = usePlaceFilterState()

  return (
    <PlaceFilterFacilitySelectorLayout>
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
    </PlaceFilterFacilitySelectorLayout>
  )
}

export function PlaceFilterFacilitySelectorLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 gap-2.5">{children}</div>
}
