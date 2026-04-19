'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceFood } from '@/domains/place'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useFilterState } from './FilterStateProvider'

export function FoodTypeSelectorSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center border border-[#eeeeee] px-5 py-[17px]"
          style={{ aspectRatio: '80 / 95' }}
        >
          <Skeleton className="w-[38px] h-[38px] mb-[15px]" />
          <Skeleton className="w-12 h-3" />
        </div>
      ))}
    </div>
  )
}

interface FoodTypeSelectorProps {
  foods: PlaceFood[]
}

export default function FoodTypeSelector({ foods }: FoodTypeSelectorProps) {
  const { selectedFoodTypes, toggleFoodType } = useFilterState()

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
