'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface MemberSearchHeaderProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function MemberSearchHeader({ value, onChange, onSearch }: MemberSearchHeaderProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="flex items-center gap-3 px-[15px] h-[55px] bg-white border-b border-[#eeeeee]">
      <button onClick={() => router.back()} className="shrink-0 cursor-pointer">
        <Image src="/images/layout/nav-left-black.png" alt="뒤로가기" width={9} height={16} />
      </button>
      <div className="relative flex items-center flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="닉네임검색하기"
          autoFocus
          className="w-full bg-transparent border-none outline-none text-sm leading-[14px] text-[#333333] placeholder:text-[#999999] pr-[24px]"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image src="/images/icon-delete-circle.png" alt="초기화" width={18} height={18} />
          </button>
        )}
      </div>
      <button onClick={onSearch} className="shrink-0 cursor-pointer">
        <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
      </button>
    </div>
  )
}
