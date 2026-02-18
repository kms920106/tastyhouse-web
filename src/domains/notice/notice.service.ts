import { noticeRepository } from './notice.repository'
import { NoticeListQuery } from './notice.type'

export const noticeService = {
  async getNoticeList(params: NoticeListQuery) {
    return noticeRepository.getNoticeList(params)
  },
}
