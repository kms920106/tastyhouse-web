import FixedBottomSection from '@/components/ui/FixedBottomSection'
import PlaceOrderCartContent from './PlaceOrderCartContent'
import PlaceOrderCartHeader from './PlaceOrderCartHeader'
import PlaceOrderCartLinkButton from './PlaceOrderCartLinkButton'

interface Props {
  placeId: number
}

export default function PlaceOrderCartPage({ placeId }: Props) {
  return (
    <>
      <PlaceOrderCartHeader />
      <PlaceOrderCartContent />
      <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
        <PlaceOrderCartLinkButton placeId={placeId} />
      </FixedBottomSection>
    </>
  )
}
