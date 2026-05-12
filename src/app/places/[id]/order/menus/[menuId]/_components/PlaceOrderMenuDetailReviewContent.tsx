import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceOrderMenuDetailReviewList from './PlaceOrderMenuDetailReviewList'
import PlaceOrderMenuDetailReviewStatistic from './PlaceOrderMenuDetailReviewStatistic'

interface Props {
  productId: number
}

export default function PlaceOrderMenuDetailReviewContent({ productId }: Props) {
  return (
    <SectionStack>
      <BorderedSection className="border-t-0">
        <PlaceOrderMenuDetailReviewStatistic productId={productId} />
      </BorderedSection>
      <BorderedSection className="border-b-0">
        <PlaceOrderMenuDetailReviewList productId={productId} />
      </BorderedSection>
    </SectionStack>
  )
}
