import { faqRepository } from './faq.repository'
import { FaqListQuery } from './faq.type'

export const faqService = {
  async getFaqList(params: FaqListQuery) {
    return faqRepository.getFaqList(params)
  },
}
