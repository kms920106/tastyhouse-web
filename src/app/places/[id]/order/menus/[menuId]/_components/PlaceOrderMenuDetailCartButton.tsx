import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import HeaderIconLink from '../../../../../../../components/layouts/header-parts/HeaderIconLink'

interface Props {
  placeId: number
  count: number
}

export default function PlaceOrderMenuDetailCartButton({ placeId, count }: Props) {
  return (
    <HeaderIconLink href={PAGE_PATHS.ORDER_CART(placeId)}>
      <div className="relative w-[22px] h-[22px] flex items-center justify-center">
        <Image
          src="/images/order/icon-cart-black.png"
          alt="장바구니"
          width={22}
          height={22}
          className="z-1"
        />
        <span className="absolute top-1.5 flex items-center justify-center w-4 h-4 text-[10px]">
          {count > 99 ? '99+' : count}
        </span>
      </div>
    </HeaderIconLink>
  )
}
