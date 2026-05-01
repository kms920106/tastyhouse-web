'use server'

import { PaginationParams } from '@/types/common'
import { bannerRepository } from '@/domains/banner/banner.repository'

export async function getHomeBanners(query: PaginationParams) {
  return bannerRepository.getHomeBanners(query)
}

export async function getSidebarBanners(query: PaginationParams) {
  return bannerRepository.getSidebarBanners(query)
}
