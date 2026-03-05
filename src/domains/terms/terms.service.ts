import { termsRepository } from './terms.repository'

export const termsService = {
  async getTerms() {
    return termsRepository.getTerms()
  },
}
