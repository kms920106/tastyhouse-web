'use client'

import { getPlaceAmenityCodeName } from '@/domains/place/place.constants'
import type { PlaceAmenity } from '@/domains/place/place.dto'
import FacilityItemContent from './FacilityItemContent'

interface Props {
  amenity: PlaceAmenity
}

export function FacilityDiv({ amenity }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-[17px] border border-main box-border"
      style={{ aspectRatio: '80 / 95' }}
    >
      <FacilityItemContent
        name={getPlaceAmenityCodeName(amenity.code)}
        imageUrl={amenity.activeImageUrl}
        isSelected={true}
      />
    </div>
  )
}
