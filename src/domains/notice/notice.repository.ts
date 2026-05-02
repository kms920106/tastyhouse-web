import 'server-only'

import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'

import { NoticeListItemResponse } from './notice.dto'

const ENDPOINT = '/api/notices'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const noticeRepository = {
  async getNoticeList(params: PaginationParams) {
    return api.get<NoticeListItemResponse[]>(`${ENDPOINT}/v1`, { ...CACHE_OPTIONS, params })
  },
}
