'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import MemberSearchHeader from './MemberSearchHeader'
import MemberSearchResultList from './MemberSearchResultList'

export default function MemberSearchSection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') ?? ''
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', trimmed)
    router.replace(`?${params.toString()}`)
  }

  return (
    <section className="min-h-screen bg-white">
      <MemberSearchHeader value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
      <div className="flex flex-col px-[15px] h-[calc(100dvh-55px)]">
        <MemberSearchResultList searchQuery={searchQuery} />
      </div>
    </section>
  )
}
