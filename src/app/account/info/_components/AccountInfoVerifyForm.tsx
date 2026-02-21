'use client'

import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const verifySchema = z.object({
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
})

type FormData = z.infer<typeof verifySchema>

type FormErrors = Partial<Record<keyof FormData, string>>

const INITIAL_FORM_DATA: FormData = {
  password: '',
}

export default function AccountInfoVerifyForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const result = verifySchema.safeParse(formData)

    if (result.success) {
      setErrors({})
      return true
    }

    const fieldErrors = z.flattenError(result.error).fieldErrors
    const newErrors: FormErrors = {}
    for (const key in fieldErrors) {
      const field = key as keyof FormData
      newErrors[field] = fieldErrors[field]?.[0]
    }
    setErrors(newErrors)
    return false
  }

  const handleConfirm = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // TODO: 비밀번호 확인 API 연동
      router.push('/account/info/edit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="px-[15px] py-[30px]">
        <p className="text-sm leading-relaxed text-[#666666]">
          회원님의 정보를 안전하게 보호하기위해
          <br />
          비밀번호를 한번 더 확인해주세요.
        </p>
        <div className="mt-[20px]">
          <AppFormField label="비밀번호" error={errors.password}>
            {({ className }) => (
              <AppInput
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="비밀번호를 입력하세요."
                className={className}
                onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && handleConfirm()}
              />
            )}
          </AppFormField>
          <div className="mt-[30px]">
            <AppSubmitButton
              onClick={handleConfirm}
              isSubmitting={isSubmitting}
              loadingText="확인 중"
            >
              확인
            </AppSubmitButton>
          </div>
        </div>
      </div>
    </>
  )
}
