import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton, CartButton } from '@/components/layouts/header-parts'
import ShareButtonClient from './ShareButtonClient'

interface Props {
  placeId: number
  productId: number
  productName: string
}

export default function PlaceOrderMenuDetailHeader({ placeId, productId, productName }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderRight>
        <ShareButtonClient placeId={placeId} productId={productId} productName={productName} />
        <CartButton placeId={placeId} />
      </HeaderRight>
    </Header>
  )
}
