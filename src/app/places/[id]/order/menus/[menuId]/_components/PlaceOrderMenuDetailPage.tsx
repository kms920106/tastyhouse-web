import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import SectionStack from '@/components/ui/SectionStack'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import PlaceOrderMenuDetailInfo from './PlaceOrderMenuDetailInfo'
import PlaceOrderMenuDetailOptionSelector from './PlaceOrderMenuDetailOptionSelector'
import type { ProductOrderMenuDetailTab } from './PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  placeId: number
  productId: number
  initialTab: ProductOrderMenuDetailTab
}

export default async function PlaceOrderMenuDetailPage({ placeId, productId, initialTab }: Props) {
  const [productResult, optionsResult, imagesResult] = await Promise.all([
    productRepository.getProductById(productId),
    productRepository.getProductOptions(productId),
    productRepository.getProductImages(productId),
  ])

  if (productResult.error || !productResult.data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('상품 정보')} />
  }

  const imageUrls = imagesResult.data?.imageUrls ?? []

  const {
    name,
    description,
    originalPrice,
    discountPrice,
    discountRate,
    reviewCount,
  } = productResult.data

  const optionGroups = optionsResult.data?.optionGroups ?? []

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
    </>
  )
}
