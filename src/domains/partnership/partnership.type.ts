export interface PartnershipRequestCreateRequest {
  businessName: string
  address: string
  addressDetail: string
  contactName: string
  contactPhone: string
  consultationRequestedAt: string // ISO 8601: "YYYY-MM-DDTHH:mm:ss"
}

export interface PartnershipRequestResponse {
  id: number
  businessName: string
  address: string
  addressDetail: string
  contactName: string
  contactPhone: string
  consultationRequestedAt: string
  createdAt: string
}
