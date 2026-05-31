import SectionStack from '@/components/ui/SectionStack'
import ShopOrderMenuList from './ShopOrderMenuList'

interface Props {
  shopId: number
}

export default function ShopOrderMenuContent({ shopId }: Props) {
  return (
    <SectionStack>
      <ShopOrderMenuList shopId={shopId} />
    </SectionStack>
  )
}
