import ShopOrderCheckoutContent from './ShopOrderCheckoutContent'
import ShopOrderCheckoutHeader from './ShopOrderCheckoutHeader'

interface Props {
  shopId: number
}

export default function ShopOrderCheckoutPage({ shopId }: Props) {
  return (
    <>
      <ShopOrderCheckoutHeader />
      <ShopOrderCheckoutContent shopId={shopId} />
    </>
  )
}
