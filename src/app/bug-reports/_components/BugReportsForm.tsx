'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import { toast } from '@/components/ui/AppToaster'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { Spinner } from '@/components/ui/shadcn/spinner'
import { createBugReport } from '@/services/bug-report'
import { uploadFile } from '@/services/file'
import Image from 'next/image'
import { useState } from 'react'
import { z } from 'zod'

const bugReportSchema = z.object({
  device: z.string().min(1, '단말기를 선택해주세요.'),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
})

type FormData = z.infer<typeof bugReportSchema>

type FormErrors = Partial<Record<keyof FormData, string>>

const INITIAL_FORM_DATA: FormData = {
  device: '',
  title: '',
  content: '',
}

interface UploadedImage {
  previewUrl: string
  fileId: number
}

export default function BugReportsForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (uploadedImages.length + files.length > 5) {
      toast('사진은 최대 5장까지 업로드할 수 있습니다.')
      return
    }

    setIsUploading(true)
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const previewUrl = URL.createObjectURL(file)
          const response = await uploadFile(file)

          if (!response?.data?.success || !response.data.data) {
            throw new Error('이미지 업로드에 실패했습니다.')
          }

          return { previewUrl, fileId: response.data.data }
        }),
      )

      setUploadedImages((prev) => [...prev, ...results])
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
      toast('이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploading(false)
      // 같은 파일 재선택 가능하도록 input 초기화
      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
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

    const fieldErrors = z.flattenError(result.error).fieldErrors
    const newErrors: FormErrors = {}
    for (const key in fieldErrors) {
      const field = key as keyof FormData
      newErrors[field] = fieldErrors[field]?.[0]
    }
    setErrors(newErrors)
    return false
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await createBugReport({
        device: formData.device,
        title: formData.title,
        content: formData.content,
        uploadedFileIds: uploadedImages.map((img) => img.fileId),
      })

      if (response?.data?.success) {
        toast('버그 제보가 접수되었습니다.')
        setFormData(INITIAL_FORM_DATA)
        setUploadedImages([])
        setErrors({})
      } else {
        toast('버그 제보 접수에 실패했습니다.')
      }
    } catch (error) {
      console.error('버그 제보 실패:', error)
      toast('버그 제보 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
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
                className={`w-full h-[50px] pl-[16px] pr-[40px] text-sm leading-[14px] border box-border appearance-none bg-white focus:outline-none ${
                  !formData.device ? 'text-[#999999]' : 'text-[#333333]'
                } ${errors.device ? 'border-[#bc4040] focus:border-[#bc4040]' : 'border-[#eeeeee] focus:border-[#666666]'} ${className ?? ''}`}
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
              placeholder="제목을 입력해주세요."
              className={`w-full h-[50px] pl-[16px] pr-4 text-sm leading-[14px] border box-border bg-white focus:outline-none placeholder:text-[#999999] text-[#333333] ${errors.title ? 'border-[#bc4040] focus:border-[#bc4040]' : 'border-[#eeeeee] focus:border-[#666666]'} ${className ?? ''}`}
            />
          )}
        </AppFormField>
        <AppFormField label="내용" required error={errors.content}>
          {({ className }) => (
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="내용을 입력해주세요."
              rows={10}
              className={`w-full px-[16px] py-3 text-sm leading-[14px] border box-border bg-white focus:outline-none placeholder:text-[#999999] text-[#333333] resize-none ${errors.content ? 'border-[#bc4040] focus:border-[#bc4040]' : 'border-[#eeeeee] focus:border-[#666666]'} ${className ?? ''}`}
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
                onChange={handleImageUpload}
                disabled={isUploading || uploadedImages.length >= 5}
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
                  {uploadedImages.length}/5
                </span>
              </div>
            </label>
            {uploadedImages.map((image, index) => (
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
                  onClick={() => removeImage(index)}
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
      <FixedBottomSection className="px-[15px] py-[15px]">
        <AppButton
          onClick={handleSubmit}
          disabled={isUploading || isSubmitting}
          className="text-white bg-[#a91201]"
        >
          {isSubmitting ? (
            <>
              제출 중
              <Spinner />
            </>
          ) : (
            '확인'
          )}
        </AppButton>
      </FixedBottomSection>
    </>
  )
}
