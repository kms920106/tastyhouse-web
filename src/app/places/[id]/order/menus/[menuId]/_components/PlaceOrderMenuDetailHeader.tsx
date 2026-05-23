import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton, CartButton } from '@/components/layouts/header-parts'
import PlaceOrderMenuDetailHeaderServer from './PlaceOrderMenuDetailHeaderServer'

interface Props {
  placeId: number
  productId: number
}

export default function PlaceOrderMenuDetailHeader({ placeId, productId }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderRight>
        <PlaceOrderMenuDetailHeaderServer placeId={placeId} productId={productId} />
        <CartButton placeId={placeId} />
      </HeaderRight>
    </Header>
  )
}
