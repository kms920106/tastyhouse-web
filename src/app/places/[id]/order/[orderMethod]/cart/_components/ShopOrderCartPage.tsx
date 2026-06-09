import StickyFooter from '@/components/ui/StickyFooter'
import type { OrderMethodType } from '@/domains/order'
import ShopOrderCartContent from './ShopOrderCartContent'
import ShopOrderCartHeader from './ShopOrderCartHeader'
import ShopOrderCartLinkButton from './ShopOrderCartLinkButton'

interface Props {
  shopId: number
  orderMethod: OrderMethodType
}

export default function ShopOrderCartPage({ shopId, orderMethod }: Props) {
  return (
    <>
      <ShopOrderCartHeader />
      <ShopOrderCartContent />
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <ShopOrderCartLinkButton shopId={shopId} orderMethod={orderMethod} />
        </div>
      </StickyFooter>
    </>
  )
}
