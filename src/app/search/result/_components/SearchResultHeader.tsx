'use client'

import { BackButton } from '@/components/layouts/header-parts'
import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import AppInput from '@/components/ui/AppInput'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  query: string
}

export default function SearchResultHeader({ query }: Props) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState(query)

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    router.replace(`${PAGE_PATHS.SEARCH_RESULT}?q=${encodeURIComponent(trimmed)}&tab=all`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <div className="flex-1 min-w-0 px-[10px]">
        <AppInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해 주세요."
          className="px-0 py-[23px] h-[55px] text-sm leading-[14px] border-0 placeholder:text-[#cccccc]"
          autoFocus
        />
      </div>
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#cccccc] shrink-0"
          aria-label="검색어 지우기"
        >
          <Image src="/images/icon-close.png" alt="삭제" width={14} height={14} />
        </button>
      )}
      <HeaderRight>
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center w-[55px] h-[55px]"
          aria-label="검색"
        >
          <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
        </button>
      </HeaderRight>
    </Header>
  )
}
