import type { WithdrawReason } from './member.types'

const WITHDRAW_REASON_NAMES: Record<WithdrawReason, string> = {
  LOW_USAGE_FREQUENCY: '서비스 이용 빈도가 낮아서',
  INSUFFICIENT_CONTENT: '콘텐츠가 부족해서',
  SWITCH_TO_ANOTHER_SERVICE: '다른 서비스로 이동',
  PRIVACY_CONCERNS: '개인정보 보호 우려',
  OTHER: '기타',
}

export const getWithdrawReasonName = (reason: WithdrawReason): string => {
  return WITHDRAW_REASON_NAMES[reason] || reason
}

export const WITHDRAW_REASON_OPTIONS: ReadonlyArray<{ value: WithdrawReason; label: string }> = (
  Object.entries(WITHDRAW_REASON_NAMES) as [WithdrawReason, string][]
).map(([value, label]) => ({ value, label }))
