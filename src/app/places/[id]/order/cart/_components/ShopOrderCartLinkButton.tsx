import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  shopId: number
}

export default function ShopOrderCartLinkButton({ shopId }: Props) {
  return (
    <Link href={PAGE_PATHS.ORDER_CHECKOUT(shopId)}>
      <AppPrimaryButton>주문하기</AppPrimaryButton>
    </Link>
  )
}
