import SectionStack from '@/components/ui/SectionStack'
import OrderMenuList from './OrderMenuList'

interface Props {
  placeId: number
}

export default function OrderMenuContent({ placeId }: Props) {
  return (
    <SectionStack>
      <OrderMenuList placeId={placeId} />
    </SectionStack>
  )
}
