import { productRepository } from '@/domains/product/product.repository'
import ProductDetailShareButtonClient from './ProductDetailShareButtonClient'

interface Props {
  productId: number
}

export default async function ProductDetailHeaderServer({ productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return null
  }

  return <ProductDetailShareButtonClient productId={productId} productName={data.name} />
}
