import { productRepository } from '@/domains/product/product.repository'
import ShareButtonClient from './ShareButtonClient'

interface Props {
  placeId: number
  productId: number
}

export default async function PlaceOrderMenuDetailHeaderServer({ placeId, productId }: Props) {
  const { error, data } = await productRepository.getProductById(productId)

  if (error || !data) {
    return null
  }

  return <ShareButtonClient placeId={placeId} productId={productId} productName={data.name} />
}
