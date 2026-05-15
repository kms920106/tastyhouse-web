import StickyFooter from '@/components/ui/StickyFooter'
import PlaceFilterApplyButton from './PlaceFilterApplyButton'

export default function PlaceFilterFooter() {
  return (
    <>
      <div className="h-[70px]" />
      <StickyFooter>
        <div className="px-[15px] py-2.5">
          <PlaceFilterApplyButton />
        </div>
      </StickyFooter>
    </>
  )
}
