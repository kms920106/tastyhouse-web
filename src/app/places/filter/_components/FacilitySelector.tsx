'use client'

import { FacilityButton } from '@/components/places/FacilityItem'
import { PlaceAmenity } from '@/domains/place'
import { useFilterState } from './FilterStateProvider'

interface Props {
  amenities: PlaceAmenity[]
}

export default function FacilitySelector({ amenities }: Props) {
  const { selectedAmenities, toggleAmenity } = useFilterState()

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

export function FacilitySelectorLayout({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-4 gap-2.5">{children}</div>
}
