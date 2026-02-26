import { api } from '@/lib/api'
import { NoticeListItem, NoticeListQuery } from './notice.type'

const ENDPOINT = '/api/notices'

export const noticeRepository = {
  async getNoticeList(params: NoticeListQuery) {
    return api.get<NoticeListItem[]>(`${ENDPOINT}/v1`, { params })
  },
}
