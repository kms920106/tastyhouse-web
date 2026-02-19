'use server'

import { PartnershipRequestCreateRequest, partnershipService } from '@/domains/partnership'

export async function createPartnershipRequest(request: PartnershipRequestCreateRequest) {
  return await partnershipService.createPartnershipRequest(request)
}
