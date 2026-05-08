'use client'

import Header from '@/components/layouts/Header'
import { BackButton, SearchButton } from '@/components/layouts/header-parts'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export default function MemberSearchHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '')

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', trimmed)
    router.replace(`?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setInputValue('')
    inputRef.current?.focus()
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.replace(`?${params.toString()}`)
  }

  return (
    <Header variant="white" height={55}>
      <BackButton />
      <div className="relative flex items-center flex-1">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="닉네임을 입력해 주세요."
          autoFocus
          className="w-full bg-transparent border-none outline-none text-sm leading-[14px] text-[#333333] placeholder:text-[#aaaaaa] pr-[24px]"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image src="/images/icon-clear.png" alt="초기화" width={15} height={15} />
          </button>
        )}
      </div>
      <SearchButton onClick={handleSearch} />
    </Header>
  )
}
