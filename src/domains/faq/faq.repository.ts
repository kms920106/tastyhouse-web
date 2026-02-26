import { api } from '@/lib/api'
import { FaqCategoryItem, FaqItem, FaqListQuery } from './faq.type'

const ENDPOINT = '/api/faqs'

export const faqRepository = {
  async getFaqCategories() {
    return api.get<FaqCategoryItem[]>(`${ENDPOINT}/v1/categories`)
  },

  async getFaqList(params?: FaqListQuery) {
    return api.get<FaqItem[]>(`${ENDPOINT}/v1`, { params })
  },
}
