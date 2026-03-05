import ErrorMessage from '@/components/ui/ErrorMessage'
import { bannerRepository } from "@/domains/banner"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import BannerSwiper from './BannerSwiper'

export default async function BannerContent() {
  // API 호출
  const query = {
    page: 0,
    size: 10,
  }
  const { data, error } = await bannerRepository.getBanners(query)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} className="py-10" />
  }

  return <BannerSwiper banners={data} />
}
