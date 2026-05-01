import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceOrderProductReviewList from './PlaceOrderProductReviewList'
import PlaceOrderProductReviewStatistic from './PlaceOrderProductReviewStatistic'

interface Props {
  productId: number
}

export default function ProductReviewContent({ productId }: Props) {
  return (
    <SectionStack>
      <BorderedSection className="border-t-0">
        <PlaceOrderProductReviewStatistic productId={productId} />
      </BorderedSection>
      <BorderedSection className="border-b-0">
        <PlaceOrderProductReviewList productId={productId} />
      </BorderedSection>
    </SectionStack>
  )
}
