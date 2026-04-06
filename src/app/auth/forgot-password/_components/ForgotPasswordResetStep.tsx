'use client'

import { resetForgotPassword } from '@/app/auth/forgot-password/action'
import AppFormField from '@/components/ui/AppFormField'
import AppInputPassword from '@/components/ui/AppInputPassword'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { extractZodFieldErrors } from '@/lib/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const resetSchema = z
  .object({
    newPassword: z.string().superRefine((val, ctx) => {
      if (val.length === 0) {
        ctx.addIssue({ code: 'custom', message: '새 비밀번호를 입력해 주세요.' })
        return
      }
      if (
        val.length < 8 ||
        !/[A-Za-z]/.test(val) ||
        !/[0-9]/.test(val) ||
        !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)
      ) {
        ctx.addIssue({
          code: 'custom',
          message: '올바른 비밀번호 형식이 아닙니다. (8자 이상, 영문자·숫자·특수문자를 각각 1개 이상 포함)',
        })
      }
    }),
    newPasswordConfirm: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['newPasswordConfirm'],
  })

type FormData = { newPassword: string; newPasswordConfirm: string }
type FormErrors = Partial<Record<keyof FormData, string>>

interface ForgotPasswordResetStepProps {
  emailVerifyToken: string
}

export default function ForgotPasswordResetStep({ emailVerifyToken }: ForgotPasswordResetStepProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({ newPassword: '', newPasswordConfirm: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validateForm = (): boolean => {
    const result = resetSchema.safeParse(formData)
    if (result.success) {
      setErrors({})
      return true
    }
    setErrors(extractZodFieldErrors(result.error) as FormErrors)
    return false
  }

  const handleConfirm = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const { error } = await resetForgotPassword(formData, emailVerifyToken)

      if (error) {
        toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }

      toast('비밀번호가 변경되었습니다.')
      router.replace('/auth/login')
    } catch {
      toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-[15px] py-[30px] flex flex-col gap-5">
      <AppFormField label="새 비밀번호" required error={errors.newPassword}>
        {({ className }) => (
          <AppInputPassword
            value={formData.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            placeholder="새 비밀번호를 입력해 주세요."
            className={className}
          />
        )}
      </AppFormField>
      <AppFormField label="새 비밀번호 확인" required error={errors.newPasswordConfirm}>
        {({ className }) => (
          <AppInputPassword
            value={formData.newPasswordConfirm}
            onChange={(e) => handleChange('newPasswordConfirm', e.target.value)}
            placeholder="새 비밀번호를 확인해 주세요."
            className={className}
            onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && handleConfirm()}
          />
        )}
      </AppFormField>
      <div className="mt-[10px]">
        <AppSubmitButton onClick={handleConfirm} isSubmitting={isSubmitting} loadingText="변경 중">
          확인
        </AppSubmitButton>
      </div>
    </div>
  )
}
