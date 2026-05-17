import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import StickyFooter from '@/components/ui/StickyFooter'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import PlaceDetailMenuListFetcher from './PlaceDetailMenuListFetcher'

interface Props {
  placeId: number
}

export default function PlaceDetailMenuListContent({ placeId }: Props) {
  return (
    <div className="px-[15px]">
      <PlaceDetailMenuListFetcher placeId={placeId} />
      <StickyFooter>
        <div className="px-[15px] py-2.5 bg-[#f9f9f9]">
          <Link href={PAGE_PATHS.ORDER_METHOD(placeId)}>
            <AppPrimaryButton>주문하기</AppPrimaryButton>
          </Link>
        </div>
      </StickyFooter>
    </div>
  )
}
