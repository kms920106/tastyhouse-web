import FixedBottomSection from '@/components/ui/FixedBottomSection'
import CartOrderButton from './CartOrderButton'
import PlaceOrderCartContent from './PlaceOrderCartContent'
import PlaceOrderCartHeader from './PlaceOrderCartHeader'

interface Props {
  placeId: number
}

export default function PlaceOrderCartPage({ placeId }: Props) {
  return (
    <>
      <PlaceOrderCartHeader />
      <PlaceOrderCartContent />
      <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
        <CartOrderButton placeId={placeId} />
      </FixedBottomSection>
    </>
  )
}
