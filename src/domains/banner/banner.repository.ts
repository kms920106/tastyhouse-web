import 'server-only'
import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import { BannerListItemResponse } from './banner.dto'

const ENDPOINT = '/api/banners'

export const bannerRepository = {
  async getHomeBanners(params: PaginationParams) {
    return api.get<BannerListItemResponse[]>(`${ENDPOINT}/v1/home`, { params })
  },

  async getSidebarBanners(params: PaginationParams) {
    return api.get<BannerListItemResponse[]>(`${ENDPOINT}/v1/sidebar`, { params })
  },
}
