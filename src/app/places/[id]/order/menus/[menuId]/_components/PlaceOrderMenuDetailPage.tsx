import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import SectionStack from '@/components/ui/SectionStack'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import PlaceOrderMenuDetailInfo from './PlaceOrderMenuDetailInfo'
import PlaceOrderMenuDetailOptionSelector from './PlaceOrderMenuDetailOptionSelector'
import type { PlaceOrderMenuDetailTabValue } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  placeId: number
  productId: number
  initialTab: PlaceOrderMenuDetailTabValue
}

export default async function PlaceOrderMenuDetailPage({ placeId, productId, initialTab }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('상품 정보')} />
  }

  const {
    name,
    description,
    imageUrls,
    originalPrice,
    discountPrice,
    discountRate,
    reviewCount,
    optionGroups,
  } = data

  return (
    <>
      <PlaceOrderMenuDetailHeader placeId={placeId} productId={productId} productName={name} />
      <SectionStack>
        <BorderedSection>
          <PlaceOrderMenuDetailInfo
            name={name}
            description={description}
            imageUrls={imageUrls}
            originalPrice={originalPrice}
            discountPrice={discountPrice}
            discountRate={discountRate}
          />
        </BorderedSection>
        <BorderedSection>
          <PlaceOrderMenuDetailOptionSelector
            productId={productId}
            placeId={placeId}
            optionGroups={optionGroups}
            reviewCount={reviewCount}
            initialTab={initialTab}
          />
        </BorderedSection>
      </SectionStack>
      <div className="h-[70px] bg-white" />
    </>
  )
}
