'use client'

import AppInput from '@/components/ui/AppInput'
import { BackButton } from '@/components/layouts/header-parts'
import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  initialQuery: string
}

export default function SearchHeader({ initialQuery }: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`${PAGE_PATHS.SEARCH}?q=${encodeURIComponent(trimmed)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <div className="w-full px-[55px]">
        <AppInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해 주세요."
          className="px-0 py-[23px] h-[55px] text-sm leading-[14px] border-0 placeholder:text-[#cccccc]"
          autoFocus
        />
      </div>
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
