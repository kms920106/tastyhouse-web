export type PolicyType =
  | 'TERMS_OF_SERVICE'
  | 'PRIVACY_POLICY'
  | 'ELECTRONIC_FINANCIAL_TRANSACTIONS'
  | 'AGE_VERIFICATION'

export interface PolicyDetail {
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
