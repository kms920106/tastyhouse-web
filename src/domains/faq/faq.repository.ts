import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { FaqListItem, FaqListQuery } from './faq.type'

// TODO: API 미구현 상태 - 실제 엔드포인트 확정 후 수정 필요
const ENDPOINT = '/api/faqs'

export const faqRepository = {
  async getFaqList(params: FaqListQuery) {
    return api.get<ApiResponse<FaqListItem[]>>(`${ENDPOINT}/v1`, { params })
  },
}
