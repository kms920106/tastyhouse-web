'use client'

import Header from '@/components/layouts/Header'
import { BackButton, SearchButton } from '@/components/layouts/header-parts'
import Image from 'next/image'
import { useRef } from 'react'

interface MemberSearchHeaderProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function MemberSearchHeader({ value, onChange, onSearch }: MemberSearchHeaderProps) {
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
    <Header variant="white" height={55}>
      <BackButton />
      <div className="relative flex items-center flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="닉네임을 입력해 주세요."
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
      <SearchButton onClick={onSearch} />
    </Header>
  )
}
