import type { PolicyType } from './policy.types'

export interface PolicyDetailResponse {
  id: number
  type: PolicyType
  version: string
  title: string
  content: string
  current: boolean
  mandatory: boolean
  effectiveDate: string
  createdAt: string
  updatedAt: string
}
