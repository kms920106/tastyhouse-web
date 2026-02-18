import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { NoticeListItem, NoticeListQuery } from './notice.type'

const ENDPOINT = '/api/notices'

export const noticeRepository = {
  async getNoticeList(params: NoticeListQuery) {
    return api.get<ApiResponse<NoticeListItem[]>>(`${ENDPOINT}/v1`, { params })
  },
}
