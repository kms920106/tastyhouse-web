'use server'

import { bannerRepository, BannerQuery } from '@/domains/banner'

export async function getHomeBanners(query: BannerQuery) {
  return bannerRepository.getHomeBanners(query)
}

export async function getSidebarBanners(query: BannerQuery) {
  return bannerRepository.getSidebarBanners(query)
}
