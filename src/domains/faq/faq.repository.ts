import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { FaqCategoryItem, FaqItem, FaqListQuery } from './faq.type'

const ENDPOINT = '/api/faqs'

export const faqRepository = {
  async getFaqCategories() {
    return api.get<ApiResponse<FaqCategoryItem[]>>(`${ENDPOINT}/v1/categories`)
  },

  async getFaqList(params?: FaqListQuery) {
    return api.get<ApiResponse<FaqItem[]>>(`${ENDPOINT}/v1`, { params })
  },
}
