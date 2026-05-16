'use client'

import Header from '@/components/layouts/Header'
import { BackButton, ClearButton, SearchButton } from '@/components/layouts/header-parts'
import AppInputText from '@/components/ui/AppInputText'
import { useRef, useState } from 'react'

interface Props {
  initialValue?: string
  placeholder?: string
  onSearch: (value: string) => void
  onClear?: () => void
}

export default function SearchInputHeader({
  initialValue = '',
  placeholder = '검색어를 입력해 주세요.',
  onSearch,
  onClear,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState(initialValue)

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleClear = () => {
    setInputValue('')
    inputRef.current?.focus()
    onClear?.()
  }

  return (
    <Header variant="white" height={55}>
      <BackButton />
      <div className="relative flex items-center flex-1">
        <AppInputText
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          className="px-0 py-[23px] h-[55px] border-0 shadow-none text-sm leading-[14px] pr-[24px] placeholder:text-[#cccccc]"
        />
        {inputValue && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <ClearButton onClick={handleClear} />
          </div>
        )}
      </div>
      <SearchButton onClick={handleSearch} />
    </Header>
  )
}
