import ShopOrderMenuContent from './ShopOrderMenuContent'
import ShopOrderMenuFooter from './ShopOrderMenuFooter'
import ShopOrderMenuHeader from './ShopOrderMenuHeader'

interface Props {
  shopId: number
}

export default function ShopOrderMenuPage({ shopId }: Props) {
  return (
    <>
      <ShopOrderMenuHeader />
      <ShopOrderMenuContent shopId={shopId} />
      <ShopOrderMenuFooter shopId={shopId} />
    </>
  )
}
