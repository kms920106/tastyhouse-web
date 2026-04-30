import FetchErrorState from '@/components/ui/FetchErrorState'
import { bannerRepository } from '@/domains/banner'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import BannerSwiper from './BannerSwiper'

export default async function BannerContent() {
  const { error, status, data } = await bannerRepository.getHomeBanners({
    page: 0,
    size: 10,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('배너')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.length === 0) {
    return null
  }

  return <BannerSwiper banners={data} />
}
