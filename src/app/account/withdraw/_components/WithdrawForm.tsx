'use client'

import AppAlertDialog from '@/components/ui/AppAlertDialog'
import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import AppFormField from '@/components/ui/AppFormField'
import AppSelect from '@/components/ui/AppSelect'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { WITHDRAW_REASON_LABEL, WithdrawReason } from '@/domains/member/member.type'
import { withdrawMember } from '@/services/member'
import { useRouter } from 'next/navigation'
import { extractZodFieldErrors } from '@/lib/form'
import { useState, useTransition } from 'react'
import { z } from 'zod'

const WITHDRAW_REASONS = Object.entries(WITHDRAW_REASON_LABEL) as [WithdrawReason, string][]

const NOTICES = [
  '회원 탈퇴시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서 소비자 보호에 관한 법률에 의거해 고객정보 보호정책에 따라 관리됩니다.',
  '탈퇴시 고객님께서 보유하셨던 적립금은 모두 삭제됩니다.',
  '회원 탈퇴 후 30일간 재가입이 불가능합니다.',
]

const withdrawSchema = z.object({
  reason: z.enum(Object.keys(WITHDRAW_REASON_LABEL) as [WithdrawReason, ...WithdrawReason[]], {
    message: '탈퇴 사유를 선택해주세요.',
  }),
})

type FormErrors = Partial<Record<keyof z.infer<typeof withdrawSchema>, string>>

export default function WithdrawForm() {
  const router = useRouter()

  const [errors, setErrors] = useState<FormErrors>({})
  const [isPending, startTransition] = useTransition()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [selectedReason, setSelectedReason] = useState<WithdrawReason | ''>('')
  const [pendingReason, setPendingReason] = useState<WithdrawReason | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = withdrawSchema.safeParse({
      reason: selectedReason || undefined,
    })

    if (!result.success) {
      setErrors(extractZodFieldErrors(result.error) as FormErrors)
      return
    }

    setErrors({})
    setPendingReason(result.data.reason)
    setConfirmOpen(true)
  }

  const handleWithdrawConfirm = () => {
    if (!pendingReason) return

    startTransition(async () => {
      const response = await withdrawMember({ reason: pendingReason })

      if (response?.error) {
        toast('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
        return
      }

      setSuccessOpen(true)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SectionStack>
          <BorderedSection>
            <div className="flex flex-col gap-5 px-[15px] pt-[24px] pb-[30px]">
              <p className="text-sm leading-[14px]">회원 탈퇴시 아래 사항을 숙지하시기 바랍니다.</p>
              <ul className="space-y-[8px]">
                {NOTICES.map((notice, index) => (
                  <li key={index} className="text-sm leading-relaxed text-[#666666]">
                    {index + 1}. {notice}
                  </li>
                ))}
              </ul>
            </div>
          </BorderedSection>
          <BorderedSection className="border-b-0">
            <div className="flex flex-col gap-5 px-[15px] pt-[24px] pb-[30px]">
              <AppFormField label="탈퇴 사유" required error={errors.reason}>
                {() => (
                  <AppSelect
                    name="reason"
                    value={selectedReason}
                    onChange={(e) => {
                      setSelectedReason(e.target.value as WithdrawReason)
                      if (errors.reason) setErrors((prev) => ({ ...prev, reason: undefined }))
                    }}
                  >
                    <option value="" disabled>
                      선택
                    </option>
                    {WITHDRAW_REASONS.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </AppSelect>
                )}
              </AppFormField>
              <AppSubmitButton isSubmitting={isPending} loadingText="처리 중">
                탈퇴하기
              </AppSubmitButton>
            </div>
          </BorderedSection>
        </SectionStack>
      </form>
      <AppConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="회원 탈퇴를 하시겠습니까?"
        description={`회원 탈퇴 시 모든 이용 및 고객 정보가 삭제 처리되며,\n복구되지 않습니다. 또한, 회원 탈퇴 후 30일동안\n재가입이 불가능합니다.`}
        confirmLabel="탈퇴"
        cancelLabel="취소"
        onConfirm={handleWithdrawConfirm}
      />
      <AppAlertDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title="회원 탈퇴가 완료되었습니다."
        description={`회원 탈퇴가 정상적으로 처리되었습니다.\n이용해 주셔서 감사합니다.`}
        confirmLabel="확인"
        onConfirm={() => router.push('/')}
      />
    </>
  )
}
