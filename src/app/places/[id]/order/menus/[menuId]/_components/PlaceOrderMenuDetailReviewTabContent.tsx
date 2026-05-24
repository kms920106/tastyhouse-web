import BorderedSection from '@/components/ui/BorderedSection'
import PlaceOrderMenuDetailReviewList from './PlaceOrderMenuDetailReviewList'
import PlaceOrderMenuDetailReviewStatistic from './PlaceOrderMenuDetailReviewStatistic'

interface Props {
  productId: number
}

export default function PlaceOrderMenuDetailReviewTabContent({ productId }: Props) {
  return (
    <>
      <BorderedSection>
        <PlaceOrderMenuDetailReviewStatistic productId={productId} />
      </BorderedSection>
      <BorderedSection>
        <PlaceOrderMenuDetailReviewList productId={productId} />
      </BorderedSection>
    </>
  )
}
