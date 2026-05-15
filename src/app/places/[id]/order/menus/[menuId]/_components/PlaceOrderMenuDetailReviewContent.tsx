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
      <BorderedSection>
        <PlaceOrderMenuDetailReviewStatistic productId={productId} />
      </BorderedSection>
      <BorderedSection>
        <PlaceOrderMenuDetailReviewList productId={productId} />
      </BorderedSection>
    </SectionStack>
  )
}
