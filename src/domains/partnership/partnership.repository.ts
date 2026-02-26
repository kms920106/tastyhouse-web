import { API_ENDPOINTS } from '@/lib/endpoints'
import { api } from '@/lib/api'
import { PartnershipRequestCreateRequest, PartnershipRequestResponse } from './partnership.type'

export const partnershipRepository = {
  async createPartnershipRequest(request: PartnershipRequestCreateRequest) {
    return api.post<PartnershipRequestResponse>(
      API_ENDPOINTS.PARTNERSHIP_REQUESTS,
      request,
    )
  },
}
