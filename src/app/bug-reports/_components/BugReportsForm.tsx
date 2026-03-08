'use client'

import AppFormField from '@/components/ui/AppFormField'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import AppTextarea from '@/components/ui/AppTextarea'
import { toast } from '@/components/ui/AppToaster'
import { Spinner } from '@/components/ui/shadcn/spinner'
import useFileUpload from '@/hooks/useFileUpload'
import { extractZodFieldErrors } from '@/lib/form'
import { cn } from '@/lib/utils'
import { createBugReport } from '@/services/bug-report'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { z } from 'zod'

const bugReportSchema = z.object({
  device: z.string().min(1, '단말기를 선택해 주세요.'),
  title: z.string().min(1, '제목을 입력해 주세요.'),
  content: z.string().min(1, '내용을 입력해 주세요.'),
})

type FormData = z.infer<typeof bugReportSchema>

type FormErrors = Partial<Record<keyof FormData, string>>

const INITIAL_FORM_DATA: FormData = {
  device: '',
  title: '',
  content: '',
}

const MAX_IMAGE_COUNT = 5

export default function BugReportsForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, startSubmitting] = useTransition()

  const { uploadedFiles, isUploading, handleInputChange, removeAt, reset: resetFiles } = useFileUpload({
    maxCount: MAX_IMAGE_COUNT,
  })

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const trimmedData = {
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
    }
    const result = bugReportSchema.safeParse(trimmedData)

    if (result.success) {
      setErrors({})
      return true
    }

    setErrors(extractZodFieldErrors(result.error) as FormErrors)
    return false
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    startSubmitting(async () => {
      try {
        const response = await createBugReport({
          device: formData.device,
          title: formData.title,
          content: formData.content,
          uploadedFileIds: uploadedFiles.map((f) => f.fileId),
        })

        if (!response?.error) {
          toast('버그 제보가 접수되었습니다.')
          setFormData(INITIAL_FORM_DATA)
          setErrors({})
          resetFiles()
        } else {
          toast('버그 제보 접수에 실패했습니다.')
        }
      } catch (error) {
        console.error('버그 제보 실패:', error)
        toast('버그 제보 중 오류가 발생했습니다.')
      }
    })
  }

  return (
    <>
      <div className="flex flex-col gap-5 px-[15px] py-5">
        <AppFormField label="단말기" required error={errors.device}>
          {({ className }) => (
            <div className="relative">
              <select
                value={formData.device}
                onChange={(e) => handleChange('device', e.target.value)}
                className={cn(
                  'w-full h-[50px] pl-[16px] pr-[40px] text-sm leading-[14px] border box-border appearance-none bg-white focus:outline-none',
                  !formData.device ? 'text-[#999999]' : 'text-[#333333]',
                  errors.device ? 'border-[#bc4040] focus:border-[#bc4040]' : 'border-[#eeeeee] focus:border-[#666666]',
                  className,
                )}
              >
                <option value="">선택</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
                <option value="web">Web</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#999999]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          )}
        </AppFormField>
        <AppFormField label="제목" required error={errors.title}>
          {({ className }) => (
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="제목을 입력해 주세요."
              className={cn(
                'w-full h-[50px] pl-[16px] pr-4 text-sm leading-[14px] border box-border bg-white focus:outline-none placeholder:text-[#999999] text-[#333333]',
                errors.title ? 'border-[#bc4040] focus:border-[#bc4040]' : 'border-[#eeeeee] focus:border-[#666666]',
                className,
              )}
            />
          )}
        </AppFormField>
        <AppFormField label="내용" required error={errors.content}>
          {({ className }) => (
            <AppTextarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="내용을 입력해 주세요."
              rows={16}
              error={!!errors.content}
              className={className}
            />
          )}
        </AppFormField>
        <div className="flex flex-col gap-2.5">
          <h3 className="flex items-center text-xs h-3 overflow-hidden">사진</h3>
          <div className="grid grid-cols-3 gap-3">
            <label className="aspect-square border border-[#eeeeee] box-border flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                disabled={isUploading || uploadedFiles.length >= MAX_IMAGE_COUNT}
                className="sr-only"
              />
              <div className="flex flex-col items-center gap-2.5">
                {isUploading ? (
                  <Spinner />
                ) : (
                  <Image
                    src="/images/icon-review-photo.png"
                    alt="사진 업로드"
                    width={23}
                    height={18}
                  />
                )}
                <span className="text-[11px] leading-[11px] text-[#999999]">
                  {uploadedFiles.length}/{MAX_IMAGE_COUNT}
                </span>
              </div>
            </label>
            {uploadedFiles.map((image, index) => (
              <div key={image.fileId} className="relative aspect-square">
                <Image
                  src={image.previewUrl}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                />
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#333333] rounded-full flex items-center justify-center"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm leading-[14px] text-[#999999]">
          아직 제보되지 않은 버그인 경우 1,000 포인트를 지급해드립니다.
        </p>
      </div>
      <div className="p-[15px]">
        <AppSubmitButton
          onClick={handleSubmit}
          disabled={isUploading}
          isSubmitting={isSubmitting}
          loadingText="제출 중"
        >
          확인
        </AppSubmitButton>
      </div>
    </>
  )
}
