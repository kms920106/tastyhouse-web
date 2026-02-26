import { api } from '@/lib/api'
import { Banner, BannerQuery } from './banner.type'

const ENDPOINT = '/api/banners'

export const bannerRepository = {
  async getBanners(params: BannerQuery) {
    return api.get<Banner[]>(`${ENDPOINT}/v1`, { params })
  },
}
