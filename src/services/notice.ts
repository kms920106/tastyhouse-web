'use server'

import { NoticeListQuery, noticeService } from '@/domains/notice'

export async function getNoticeList(params: NoticeListQuery) {
  return await noticeService.getNoticeList(params)
}
