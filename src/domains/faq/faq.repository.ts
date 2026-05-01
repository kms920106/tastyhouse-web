import 'server-only'
import { api } from '@/lib/api'
import { FaqListQuery } from './faq.dto'
import { FaqCategoryItem, FaqItem } from './faq.model'

const ENDPOINT = '/api/faqs'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const faqRepository = {
  async getFaqCategories() {
    return api.get<FaqCategoryItem[]>(`${ENDPOINT}/v1/categories`, CACHE_OPTIONS)
  },

  async getFaqList(params?: FaqListQuery) {
    return api.get<FaqItem[]>(`${ENDPOINT}/v1`, { ...CACHE_OPTIONS, params })
  },
}
