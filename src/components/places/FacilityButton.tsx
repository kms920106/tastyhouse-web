'use client'

import { getPlaceAmenityCodeName } from '@/domains/place/place.constants'
import { PlaceAmenity } from '@/domains/place/place.model'
import { cn } from '@/lib/utils'
import FacilityItemContent from './FacilityItemContent'

interface Props {
  amenity: PlaceAmenity
  isSelected: boolean
  onClick: () => void
}

export function FacilityButton({ amenity, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer',
        isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]',
      )}
      style={{ aspectRatio: '80 / 95' }}
    >
      <FacilityItemContent
        name={getPlaceAmenityCodeName(amenity.code)}
        imageUrl={isSelected ? amenity.activeImageUrl : amenity.inactiveImageUrl}
        isSelected={isSelected}
      />
    </button>
  )
}
