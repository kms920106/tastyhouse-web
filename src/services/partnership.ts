'use server'

import { PartnershipRequestCreateRequest, partnershipRepository } from '@/domains/partnership'

export async function createPartnershipRequest(request: PartnershipRequestCreateRequest) {
  return partnershipRepository.createPartnershipRequest(request)
}
