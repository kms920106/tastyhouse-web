import FoodTypeItemContent from '@/components/places/FoodTypeItemContent'
import type { PlaceFood } from '@/domains/place/place.model'

interface Props {
  foodType: PlaceFood
}

export default function MenuGridItem({ foodType }: Props) {
  return (
    <FoodTypeItemContent
      name={foodType.name}
      imageUrl={foodType.activeImageUrl}
      isSelected={true}
    />
  )
}
