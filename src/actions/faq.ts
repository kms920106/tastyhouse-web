'use server'

import { faqRepository, FaqListQuery } from '@/domains/faq'

export async function getFaqList(params?: FaqListQuery) {
  return faqRepository.getFaqList(params)
}
