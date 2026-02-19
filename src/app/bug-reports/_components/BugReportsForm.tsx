'use client'

import Image from 'next/image'
import { useState } from 'react'
import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'

interface FormData {
  device: string
  title: string
  content: string
  images: File[]
}

interface FormErrors {
  device?: string
  title?: string
  content?: string
}

export default function BugReportsForm() {
  const [formData, setFormData] = useState<FormData>({
    device: '',
    title: '',
    content: '',
    images: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (field: keyof FormData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const currentImages = formData.images

    if (currentImages.length + files.length > 5) {
      alert('사진은 최대 5장까지 업로드할 수 있습니다.')
      return
    }

    handleChange('images', [...currentImages, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleChange('images', newImages)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.device) newErrors.device = '단말기를 선택해주세요.'
    if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요.'
    if (!formData.content.trim()) newErrors.content = '내용을 입력해주세요.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    // TODO: 제출 API 연동
    console.log('제출:', formData)
    alert('버그 제보가 접수되었습니다.')
  }

  return (
    <>
      {/* 폼 섹션 */}
      <div className="flex flex-col gap-5 px-[15px] py-5">
        {/* 단말기 */}
        <AppFormField label="단말기" required error={errors.device}>
          {({ className }) => (
            <div className="relative">
              <select
                value={formData.device}
                onChange={(e) => handleChange('device', e.target.value)}
                className={`w-full h-[50px] pl-[16px] pr-[40px] text-sm leading-[14px] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666] ${
                  !formData.device ? 'text-[#999999]' : 'text-[#333333]'
                } ${className ?? ''}`}
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

        {/* 제목 */}
        <AppFormField label="제목" required error={errors.title}>
          {({ className }) => (
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="제목을 입력해주세요."
              className={`w-full h-[50px] pl-[16px] pr-4 text-sm leading-[14px] border border-[#eeeeee] box-border bg-white focus:outline-none focus:border-[#666666] placeholder:text-[#999999] text-[#333333] ${className ?? ''}`}
            />
          )}
        </AppFormField>

        {/* 내용 */}
        <AppFormField label="내용" required error={errors.content}>
          {({ className }) => (
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="내용을 입력해주세요."
              rows={10}
              className={`w-full px-[16px] py-3 text-sm leading-[14px] border border-[#eeeeee] box-border bg-white focus:outline-none focus:border-[#666666] placeholder:text-[#999999] text-[#333333] resize-none ${className ?? ''}`}
            />
          )}
        </AppFormField>

        {/* 사진 */}
        <div className="flex flex-col gap-2.5">
          <h3 className="flex items-center text-xs h-3 overflow-hidden">사진</h3>
          <div className="flex gap-3 overflow-x-auto">
            {/* 업로드 버튼 */}
            <label className="flex-shrink-0 w-24 h-24 border border-[#eeeeee] box-border flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="sr-only"
              />
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="text-[#cccccc] mb-1"
              >
                <rect
                  x="4"
                  y="7"
                  width="28"
                  height="22"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="27" cy="11" r="1.5" fill="currentColor" />
                <path d="M12 7l2-3h8l2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[12px] text-[#999999]">{formData.images.length}/5</span>
            </label>

            {/* 이미지 미리보기 */}
            {formData.images.map((image, index) => (
              <div key={index} className="relative flex-shrink-0 w-24 h-24">
                <Image
                  src={URL.createObjectURL(image)}
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

        {/* 안내 문구 */}
        <p className="text-[13px] text-[#666666] leading-relaxed">
          아직 제보되지 않은 버그인 경우 1,000포인트를 지급해드립니다.
        </p>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] px-[15px] py-[15px]">
        <AppButton onClick={handleSubmit} className="text-white bg-[#E87167] rounded-lg active:bg-[#D86157]">
          확인
        </AppButton>
      </div>
    </>
  )
}
