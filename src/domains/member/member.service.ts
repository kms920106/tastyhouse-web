import { memberRepository } from './member.repository'

export const memberService = {
  async getMyCoupons() {
    const { error, data } = await memberRepository.getMyCoupons()
    return error ? [] : data ?? []
  },
}
