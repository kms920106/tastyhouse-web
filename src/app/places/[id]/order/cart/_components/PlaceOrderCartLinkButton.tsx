import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface CartOrderButtonProps {
  placeId: number
}

export default function PlaceOrderCartLinkButton({ placeId }: CartOrderButtonProps) {
  return (
    <Link href={PAGE_PATHS.ORDER_CHECKOUT(placeId)}>
      <AppPrimaryButton>주문하기</AppPrimaryButton>
    </Link>
  )
}
