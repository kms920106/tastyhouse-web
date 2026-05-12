import ImageGallery from '@/app/places/[id]/(detail)/_components/ImageGallery'
import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import SectionStack from '@/components/ui/SectionStack'
import { productRepository } from '@/domains/product/product.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { formatDecimal, formatNumber } from '@/lib/number'
import PlaceOrderMenuDetailHeader from './PlaceOrderMenuDetailHeader'
import PlaceOrderMenuDetailOptionSelector from './PlaceOrderMenuDetailOptionSelector'

interface Props {
  placeId: number
  productId: number
}

export default async function PlaceOrderMenuDetailContent({ placeId, productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('상품 정보')} />
  }

  const product = data

  return (
    <>
      <PlaceOrderMenuDetailHeader
        placeId={placeId}
        productId={product.id}
        productName={product.name}
      />
      <SectionStack>
        <BorderedSection className="border-t-0">
          <ImageGallery imageUrls={product.imageUrls} />
          <div className="px-[15px] py-[21px]">
            <h1 className="text-lg leading-[18px] font-bold">{product.name}</h1>
            <p className="mt-[13px] text-sm leading-relaxed">{product.description}</p>
            <div className="mt-[17px]">
              {product.discountRate == null ? (
                <p className="mt-[13px] text-base leading-[16px]">
                  {formatNumber(product.originalPrice)}원
                </p>
              ) : (
                <div className="flex items-end leading-[21px]">
                  <p className="text-base leading-[16px]">
                    {formatNumber(product.discountPrice ?? 0)}원
                  </p>
                  <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                    {formatNumber(product.originalPrice)}원
                  </p>
                  <p className="ml-[11px] text-sm leading-[14px] text-main">
                    {formatDecimal(product.discountRate, 0)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </BorderedSection>
        <PlaceOrderMenuDetailOptionSelector
          productId={product.id}
          placeId={placeId}
          optionGroups={product.optionGroups}
          reviewCount={product.reviewCount}
        />
      </SectionStack>
      <div className="h-[71px] bg-white" />
    </>
  )
}
