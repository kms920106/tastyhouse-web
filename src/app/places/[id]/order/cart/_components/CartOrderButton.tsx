import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface CartOrderButtonProps {
  placeId: number
}

export default function CartOrderButton({ placeId }: CartOrderButtonProps) {
  return (
    <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
      <Link href={PAGE_PATHS.ORDER_CHECKOUT(placeId)}>
        <AppPrimaryButton>주문하기</AppPrimaryButton>
      </Link>
    </FixedBottomSection>
  )
}
