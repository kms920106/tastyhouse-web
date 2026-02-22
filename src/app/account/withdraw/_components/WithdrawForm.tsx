'use client'

import AppFormField from '@/components/ui/AppFormField'
import AppSelect from '@/components/ui/AppSelect'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { WITHDRAW_REASON_LABEL, WithdrawReason } from '@/domains/member/member.type'
import { withdrawMember } from '@/services/member'
import { useRouter } from 'next/navigation'
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

  const handleSubmit = (formData: FormData) => {
    const result = withdrawSchema.safeParse({
      reason: formData.get('reason') || undefined,
    })

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors
      const newErrors: FormErrors = {}
      for (const key in fieldErrors) {
        const field = key as keyof FormErrors
        newErrors[field] = fieldErrors[field]?.[0]
      }
      setErrors(newErrors)
      return
    }

    setErrors({})

    startTransition(async () => {
      const response = await withdrawMember({ reason: result.data.reason })

      if (response?.error) {
        toast('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
        return
      }

      router.push('/')
    })
  }

  return (
    <form action={handleSubmit}>
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
            <AppFormField label="탈퇴사유" required error={errors.reason}>
              {() => (
                <AppSelect
                  name="reason"
                  defaultValue=""
                  onChange={() => {
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
  )
}
