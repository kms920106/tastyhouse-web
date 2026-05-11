import SectionStack from '@/components/ui/SectionStack'
import PlaceOrderMenuList from './PlaceOrderMenuList'

interface Props {
  placeId: number
}

export default function PlaceOrderMenuContent({ placeId }: Props) {
  return (
    <SectionStack>
      <PlaceOrderMenuList placeId={placeId} />
    </SectionStack>
  )
}
