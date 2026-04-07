'use server'

import { partnershipRepository, PartnershipRequestCreateRequest } from '@/domains/partnership'

export async function createPartnershipRequest(request: PartnershipRequestCreateRequest) {
  return partnershipRepository.createPartnershipRequest(request)
}
