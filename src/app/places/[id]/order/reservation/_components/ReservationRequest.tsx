'use client'

import AppTextarea from '@/components/ui/AppTextarea'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function ReservationRequest({ value, onChange }: Props) {
  return (
    <div className="px-[15px] py-6 border-t-[6px] border-line">
      <h2 className="mb-4 text-[17px]">요청사항</h2>
      <AppTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="업체에 요청하실 내용을 적어주세요."
        className="h-32"
      />
    </div>
  )
}
