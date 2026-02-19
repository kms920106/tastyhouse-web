'use server'

import { FaqListQuery, faqService } from '@/domains/faq'

export async function getFaqList(params?: FaqListQuery) {
  return await faqService.getFaqList(params)
}
