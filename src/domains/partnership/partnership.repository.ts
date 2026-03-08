import { api } from '@/lib/api'
import { PartnershipRequestCreateRequest, PartnershipRequestResponse } from './partnership.type'

const ENDPOINT = '/api/partnership-requests'

export const partnershipRepository = {
  async createPartnershipRequest(request: PartnershipRequestCreateRequest) {
    return api.post<PartnershipRequestResponse>(`${ENDPOINT}/v1`, request)
  },
}
