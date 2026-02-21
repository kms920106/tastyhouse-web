'use client'

import { toast } from '../ui/AppToaster'

interface SubmitButtonProps {
  form: {
    placeName?: string
    menuName?: string
    content: string
    photos: File[]
    tags: string[]
  }
  disabled?: boolean
}

export default function SubmitButton({ form, disabled = false }: SubmitButtonProps) {
  const handleSubmit = async () => {
    if (!form.placeName) {
      toast('상호명은 필수 입력 사항입니다.')
      return
    }
    if (!form.content) {
      toast('내용은 필수 입력 사항입니다.')
      return
    }

    // TODO: 리뷰 생성 API 연동
    toast('리뷰 등록 기능은 준비 중입니다.')
  }

  return (
    <button
      className={`w-full py-3 text-base leading-[16px] ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-main text-white cursor-pointer'
      }`}
      onClick={handleSubmit}
      disabled={disabled}
    >
      등록하기
    </button>
  )
}
