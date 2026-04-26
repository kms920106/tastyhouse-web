import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PlaceOrderProductReviewList from './PlaceOrderProductReviewList'
import PlaceOrderProductReviewStatistic from './PlaceOrderProductReviewStatistic'

interface ProductReviewContentProps {
  productId: number
}

export default function ProductReviewContent({ productId }: ProductReviewContentProps) {
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
