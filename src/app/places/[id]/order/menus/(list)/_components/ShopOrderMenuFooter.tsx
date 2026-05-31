import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import StickyFooter from '@/components/ui/StickyFooter'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import CartItemCount from './CartItemCount'

interface Props {
  shopId: number
}

export default function ShopOrderMenuFooter({ shopId }: Props) {
  return (
    <>
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <Link href={PAGE_PATHS.ORDER_CART(shopId)}>
            <AppPrimaryButton className="gap-1">
              <CartItemCount shopId={shopId} />
            </AppPrimaryButton>
          </Link>
        </div>
      </StickyFooter>
    </>
  )
}
