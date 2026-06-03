'use client'

import AppFormField from '@/components/ui/AppFormField'
import AppTextarea from '@/components/ui/AppTextarea'
import { cn } from '@/lib/utils'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function ReservationRequest({ value, onChange }: Props) {
  return (
    <div className="px-[15px] py-6">
      <AppFormField label="요청사항">
        {({ className }) => (
          <AppTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="업체에 요청하실 내용을 적어주세요."
            className={cn('h-32', className)}
          />
        )}
      </AppFormField>
    </div>
  )
}
