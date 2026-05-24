import PlaceImageGallery from '@/components/places/PlaceImageGallery'
import { productRepository } from '@/domains/product/product.repository'

interface Props {
  productId: number
}

export default async function ProductDetailBannerContent({ productId }: Props) {
  const { error, data } = await productRepository.getProductImages(productId)

  if (error || !data) {
    return null
  }

  const { imageUrls } = data

  return <PlaceImageGallery imageUrls={imageUrls} />
}
