import { api } from '@/lib/api'
import { Banner, BannerQuery } from './banner.type'

const ENDPOINT = '/api/banners'

export const bannerRepository = {
  async getHomeBanners(params: BannerQuery) {
    return api.get<Banner[]>(`${ENDPOINT}/v1/home`, { params })
  },

  async getSidebarBanners(params: BannerQuery) {
    return api.get<Banner[]>(`${ENDPOINT}/v1/sidebar`, { params })
  },
}
