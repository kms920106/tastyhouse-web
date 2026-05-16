'use client'

import Image from 'next/image'

interface Props {
  onClick: () => void
}

export default function ClearButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer"
      aria-label="검색어 초기화"
    >
      <Image src="/images/icon-clear.png" alt="초기화" width={15} height={15} />
    </button>
  )
}
