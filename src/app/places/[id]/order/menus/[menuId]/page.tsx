import ErrorMessage from '@/components/ui/ErrorMessage'
import { productService } from '@/domains/product'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import PlaceOrderMenuDetailSection from './_components/PlaceOrderMenuDetailSection'

interface PlaceOrderMenuDetailPageProps {
  params: Promise<{
    id: string
    menuId: string
  }>
}

export default async function PlaceOrderMenuDetailPage({ params }: PlaceOrderMenuDetailPageProps) {
  const { id, menuId } = await params

  const placeId = Number(id)
  const productId = Number(menuId)

  // API 호출
  const { error, data } = await productService.getProductById(productId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('상품 정보')} />
  }

  return <PlaceOrderMenuDetailSection placeId={placeId} product={data} />
}
