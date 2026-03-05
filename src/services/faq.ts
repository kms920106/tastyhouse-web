'use server'

import { FaqListQuery, faqRepository } from '@/domains/faq'

export async function getFaqList(params?: FaqListQuery) {
  return faqRepository.getFaqList(params)
}
