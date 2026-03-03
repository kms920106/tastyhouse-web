'use client'

import { getPlaceAmenityCodeName } from '@/constants/place'
import { PlaceAmenity } from '@/domains/place'
import { resolveImageUrl } from '@/lib/image'
import Image from 'next/image'
import { Skeleton } from '../ui/shadcn/skeleton'

export function FacilityItemSkeleton() {
  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-[17px] border border-[#eeeeee] box-border"
      style={{ aspectRatio: '80 / 95' }}
    >
      <Skeleton className="w-[38px] h-[38px] mb-[15px]" />
      <Skeleton className="w-12 h-3" />
    </div>
  )
}

interface FacilityItemContentProps {
  name: string
  imageUrl: string
  isSelected: boolean
}

function FacilityItemContent({ name, imageUrl, isSelected }: FacilityItemContentProps) {
  return (
    <>
      <div className="relative flex items-center justify-center w-full h-12 mb-[15px]">
        <Image
          src={resolveImageUrl(imageUrl)}
          alt={name}
          width={32}
          height={25}
          className="object-contain max-w-full max-h-full"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <span
        className={`text-xs leading-[12px] whitespace-nowrap ${
          isSelected ? 'text-main' : 'text-[#cccccc] opacity-50'
        }`}
      >
        {name}
      </span>
    </>
  )
}

interface FacilityButtonProps {
  amenity: PlaceAmenity
  isSelected: boolean
  onClick: () => void
}

export function FacilityButton({ amenity, isSelected, onClick }: FacilityButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer ${
        isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]'
      }`}
      style={{ aspectRatio: '80 / 95' }}
    >
      <FacilityItemContent
        name={getPlaceAmenityCodeName(amenity.code)}
        imageUrl={isSelected ? amenity.imageUrlOn : amenity.imageUrlOff}
        isSelected={isSelected}
      />
    </button>
  )
}

interface FacilityDivProps {
  amenity: PlaceAmenity
}

export function FacilityDiv({ amenity }: FacilityDivProps) {
  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-[17px] border border-main box-border"
      style={{ aspectRatio: '80 / 95' }}
    >
      <FacilityItemContent
        name={getPlaceAmenityCodeName(amenity.code)}
        imageUrl={amenity.imageUrlOn}
        isSelected={true}
      />
    </div>
  )
}
