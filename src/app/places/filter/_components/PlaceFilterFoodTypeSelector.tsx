'use client'

import FoodTypeItemContent from '@/components/places/FoodTypeItemContent'
import { PlaceFood } from '@/domains/place'
import { cn } from '@/lib/utils'
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
              'flex flex-col items-center justify-center gap-[15px] px-5 py-[17px] border box-border cursor-pointer',
              isSelected ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]',
            )}
            style={{ aspectRatio: '80 / 95' }}
            onClick={() => toggleFoodType(foodType.code)}
          >
            <FoodTypeItemContent
              name={foodType.name}
              imageUrl={isSelected ? foodType.activeImageUrl : foodType.inactiveImageUrl}
              isSelected={isSelected}
            />
          </button>
        )
      })}
    </div>
  )
}
