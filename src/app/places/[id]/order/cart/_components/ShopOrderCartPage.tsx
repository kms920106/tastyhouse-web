import StickyFooter from '@/components/ui/StickyFooter'
import ShopOrderCartContent from './ShopOrderCartContent'
import ShopOrderCartHeader from './ShopOrderCartHeader'
import ShopOrderCartLinkButton from './ShopOrderCartLinkButton'

interface Props {
  shopId: number
}

export default function ShopOrderCartPage({ shopId }: Props) {
  return (
    <>
      <ShopOrderCartHeader />
      <ShopOrderCartContent />
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <ShopOrderCartLinkButton shopId={shopId} />
        </div>
      </StickyFooter>
    </>
  )
}
