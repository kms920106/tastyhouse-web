'use client'

import AppInputText from '@/components/ui/AppInputText'
import Image from 'next/image'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative flex items-center shrink-0">
      <AppInputText
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="!bg-[#fafafa] rounded-[2.5px] border-[#eeeeee] pr-[40px]"
      />
      <button className="absolute right-[17px] top-1/2 -translate-y-1/2">
        <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
      </button>
    </div>
  )
}
