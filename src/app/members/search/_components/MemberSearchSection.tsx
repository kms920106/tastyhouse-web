'use client'

import { useState } from 'react'
import MemberSearchHeader from './MemberSearchHeader'
import MemberSearchResultList from './MemberSearchResultList'

export default function MemberSearchSection() {
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    setSearchQuery(inputValue.trim())
  }

  return (
    <section className="min-h-screen bg-white">
      <MemberSearchHeader
        value={inputValue}
        onChange={setInputValue}
        onSearch={handleSearch}
      />
      <div className="flex flex-col px-[15px] h-[calc(100dvh-55px)]">
        <MemberSearchResultList searchQuery={searchQuery} />
      </div>
    </section>
  )
}
