'use client'

import { useState } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const keywords = [
    '샌드위치',
    '바나나',
    '사과',
    '햄버거',
    '피자',
    '김밥',
    '라면',
    '커피',
    '케이크',
    '샐러드',
  ]

  const filteredKeywords = keywords.filter(
    (kw) => inputValue && kw.includes(inputValue) && !value.includes(kw),
  )

  const dropdownList =
    inputValue && filteredKeywords.length > 0
      ? filteredKeywords
      : inputValue && !value.includes(inputValue)
        ? [inputValue]
        : []

  const handleTagAdd = (tag: string) => {
    if (!value.includes(tag) && tag.trim()) {
      onChange([...value, tag.trim()])
    }
    setInputValue('')
  }

  const handleTagRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      handleTagAdd(inputValue.trim())
    }
  }

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 150)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="relative">
        <input
          type="text"
          className="w-full h-[50px] px-4 text-sm border border-border-input box-border focus:border-input-focus focus:ring-1 focus:ring-border-input-focus outline-none"
          id="tag"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {isFocused && inputValue && dropdownList.length > 0 && (
          <ul
            className="absolute left-0 top-full w-full border border-gray-200 rounded-md mt-1
                           bg-white shadow max-h-48 overflow-y-auto z-10"
          >
            {dropdownList.map((kw, index) => (
              <li
                key={index}
                className="px-3 py-2 cursor-pointer text-sm"
                onMouseDown={() => handleTagAdd(kw)}
              >
                {kw}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
          >
            #{tag}
            <button
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-gray-500 cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
