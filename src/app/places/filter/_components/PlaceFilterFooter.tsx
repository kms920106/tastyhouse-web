import FixedBottomSection from '@/components/ui/FixedBottomSection'
import PlaceFilterApplyButton from './PlaceFilterApplyButton'

export default function PlaceFilterFooter() {
  return (
    <>
      <div className="h-[70px]" />
      <FixedBottomSection>
        <div className="px-[15px] py-2.5">
          <PlaceFilterApplyButton />
        </div>
      </FixedBottomSection>
    </>
  )
}
