import { api } from '@/lib/api'
import { NoticeListItem, NoticeListQuery } from './notice.type'

const ENDPOINT = '/api/notices'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const noticeRepository = {
  async getNoticeList(params: NoticeListQuery) {
    return api.get<NoticeListItem[]>(`${ENDPOINT}/v1`, { ...CACHE_OPTIONS, params })
  },
}
