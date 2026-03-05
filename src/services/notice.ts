'use server'

import { NoticeListQuery, noticeRepository } from '@/domains/notice'

export async function getNoticeList(params: NoticeListQuery) {
  return await noticeRepository.getNoticeList(params)
}
