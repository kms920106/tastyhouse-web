import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import CartItemCount from './CartItemCount'

interface Props {
  placeId: number
}

export default function PlaceOrderMenuFooter({ placeId }: Props) {
  return (
    <>
      <FixedBottomSection>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <Link href={PAGE_PATHS.ORDER_CART(placeId)}>
            <AppPrimaryButton className="gap-1">
              <CartItemCount placeId={placeId} />
            </AppPrimaryButton>
          </Link>
        </div>
      </FixedBottomSection>
      <div className="h-[71px] bg-white" />
    </>
  )
}
