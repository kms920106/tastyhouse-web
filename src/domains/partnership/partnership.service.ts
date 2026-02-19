import { partnershipRepository } from './partnership.repository'
import { PartnershipRequestCreateRequest } from './partnership.type'

export const partnershipService = {
  async createPartnershipRequest(request: PartnershipRequestCreateRequest) {
    return partnershipRepository.createPartnershipRequest(request)
  },
}
