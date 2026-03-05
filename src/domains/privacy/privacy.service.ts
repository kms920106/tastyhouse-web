import { privacyRepository } from './privacy.repository'

export const privacyService = {
  async getPrivacy() {
    return privacyRepository.getPrivacy()
  },
}
