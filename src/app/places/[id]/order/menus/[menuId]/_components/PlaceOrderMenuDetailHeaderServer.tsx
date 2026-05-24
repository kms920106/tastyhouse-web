import { productRepository } from '@/domains/product/product.repository'
import ProductShareButton from '@/components/products/ProductShareButton'

interface Props {
  placeId: number
  productId: number
}

export default async function PlaceOrderMenuDetailHeaderServer({ placeId, productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return null
  }

  return <ProductShareButton placeId={placeId} productId={productId} productName={data.name} />
}
