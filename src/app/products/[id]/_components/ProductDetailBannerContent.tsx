import PlaceImageGallery from '@/components/places/PlaceImageGallery'
import { productRepository } from '@/domains/product/product.repository'

interface Props {
  productId: number
}

export default async function ProductDetailBannerContent({ productId }: Props) {
  const { data } = await productRepository.getProductImages(productId)

  if (!data) {
    return null
  }

  return <PlaceImageGallery imageUrls={data.imageUrls} />
}
