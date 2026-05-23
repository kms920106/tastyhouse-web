import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceOrderMenuDetailInfo from './PlaceOrderMenuDetailInfo'

interface Props {
  productId: number
}

export default async function PlaceOrderMenuDetailInfoServer({ productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('상품 정보')} />
  }

  const { name, description, originalPrice, discountPrice, discountRate } = data

  return (
    <PlaceOrderMenuDetailInfo
      name={name}
      description={description}
      originalPrice={originalPrice}
      discountPrice={discountPrice}
      discountRate={discountRate}
    />
  )
}
