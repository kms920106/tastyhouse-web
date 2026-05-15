import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import StickyFooter from '@/components/ui/StickyFooter'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import PlaceMenuListFetcher from './PlaceMenuListFetcher'

interface Props {
  placeId: number
}

export default function PlaceMenuListSection({ placeId }: Props) {
  return (
    <section className="px-[15px] pb-[70px]">
      <PlaceMenuListFetcher placeId={placeId} />
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <Link href={PAGE_PATHS.ORDER_METHOD(placeId)}>
            <AppPrimaryButton>주문하기</AppPrimaryButton>
          </Link>
        </div>
      </StickyFooter>
    </section>
  )
}
