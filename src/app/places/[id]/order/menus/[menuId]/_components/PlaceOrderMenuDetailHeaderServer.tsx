import ProductShareButton from '@/components/products/ProductShareButton'
import { productRepository } from '@/domains/product/product.repository'

interface Props {
  productId: number
}

export default async function PlaceOrderMenuDetailHeaderServer({ productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return null
  }

  return <ProductShareButton productId={productId} productName={data.name} />
}
