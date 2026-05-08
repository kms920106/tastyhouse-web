'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import MemberSearchHContent from './MemberSearchHContent'
import MemberSearchHeader from './MemberSearchHeader'

interface Props {
  initialQuery: string
}

export default function MemberSearchPage({ initialQuery }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') ?? initialQuery
  const [inputValue, setInputValue] = useState(searchQuery)

  const handleSearch = () => {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', trimmed)
    router.replace(`?${params.toString()}`)
  }

  return (
    <>
      <MemberSearchHeader value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
      <MemberSearchHContent searchQuery={searchQuery} />
    </>
  )
}
