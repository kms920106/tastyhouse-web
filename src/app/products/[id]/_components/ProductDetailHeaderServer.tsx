import ProductShareButton from '@/components/products/ProductShareButton'
import { productRepository } from '@/domains/product/product.repository'

interface Props {
  productId: number
}

export default async function ProductDetailHeaderServer({ productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return null
  }

  return <ProductShareButton productId={productId} productName={data.name} />
}
