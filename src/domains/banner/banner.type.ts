import type { PaginationParams } from '@/types/common'

export interface Banner {
  id: number
  imageUrl: string
  linkUrl: string | null
  title: string
}

export type BannerQuery = PaginationParams & {}
