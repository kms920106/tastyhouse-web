import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default function PlaceOrderCartLinkButton({ placeId }: Props) {
  return (
    <Link href={PAGE_PATHS.ORDER_CHECKOUT(placeId)}>
      <AppPrimaryButton>주문하기</AppPrimaryButton>
    </Link>
  )
}
