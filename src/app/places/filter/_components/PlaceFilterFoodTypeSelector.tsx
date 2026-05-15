'use client'

import { PlaceFood } from '@/domains/place'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePlaceFilterState } from './PlaceFilterStateProvider'

interface Props {
  foods: PlaceFood[]
}

export default function PlaceFilterFoodTypeSelector({ foods }: Props) {
  const { selectedFoodTypes, toggleFoodType } = usePlaceFilterState()

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {foods.map((foodType: PlaceFood) => {
        const isSelected = selectedFoodTypes.includes(foodType.code)
        return (
          <button
            key={foodType.code}
            className={cn(
              'flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer',
              isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]',
            )}
            style={{ aspectRatio: '80 / 95' }}
            onClick={() => toggleFoodType(foodType.code)}
          >
            <div
              className={cn(
                'relative flex items-center justify-center w-full h-12 mb-[15px]',
                !isSelected && 'opacity-50',
              )}
            >
              <Image
                src={isSelected ? foodType.activeImageUrl : foodType.inactiveImageUrl}
                alt={foodType.name}
                width={56}
                height={35}
                className="object-contain max-w-full max-h-full"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <span
              className={cn(
                'text-xs leading-[12px] whitespace-nowrap',
                isSelected ? 'text-main' : 'text-[#cccccc] opacity-50',
              )}
            >
              {foodType.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
