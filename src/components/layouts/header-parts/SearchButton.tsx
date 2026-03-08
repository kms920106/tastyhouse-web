'use client'

import Image from 'next/image'

interface SearchButtonProps {
  onClick: () => void
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
    </button>
  )
}
