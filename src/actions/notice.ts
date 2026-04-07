'use server'

import { noticeRepository, NoticeListQuery } from '@/domains/notice'

export async function getNoticeList(params: NoticeListQuery) {
  return noticeRepository.getNoticeList(params)
}
