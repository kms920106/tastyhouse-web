import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import PlaceMenuListFetcher from './PlaceMenuListFetcher'

interface PlaceMenuListSectionProps {
  placeId: number
}

export default function PlaceMenuListSection({ placeId }: PlaceMenuListSectionProps) {
  return (
    <section className="px-[15px]">
      <PlaceMenuListFetcher placeId={placeId} />
      <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
        <Link href={PAGE_PATHS.ORDER_METHOD(placeId)}>
          <AppPrimaryButton>주문하기</AppPrimaryButton>
        </Link>
      </FixedBottomSection>
    </section>
  )
}
