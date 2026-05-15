import StickyFooter from '@/components/ui/StickyFooter'
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
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <PlaceOrderCartLinkButton placeId={placeId} />
        </div>
      </StickyFooter>
    </>
  )
}
