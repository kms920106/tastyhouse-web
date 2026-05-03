import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import SectionStack from '@/components/ui/SectionStack'
import { productRepository } from '@/domains/product/product.repository'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import ProductInfoSection from './ProductInfoSection'
import ProductOptionSelector from './ProductOptionSelector'

interface Props {
  placeId: number
  productId: number
}

export default async function PlaceOrderMenuDetailPage({ placeId, productId }: Props) {
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
        <BorderedSection className="border-t-0">
          <ProductInfoSection
            name={name}
            description={description}
            imageUrls={imageUrls}
            originalPrice={originalPrice}
            discountPrice={discountPrice}
            discountRate={discountRate}
          />
        </BorderedSection>
        <ProductOptionSelector
          productId={productId}
          placeId={placeId}
          optionGroups={optionGroups}
          reviewCount={reviewCount}
        />
      </SectionStack>
      <div className="h-[71px] bg-white" />
    </>
  )
}
