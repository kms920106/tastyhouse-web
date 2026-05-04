'use client'

import Image from 'next/image'
import HeaderIconButton from './HeaderIconButton'

interface Props {
  onClick: () => void
}

export default function SearchButton({ onClick }: Props) {
  return (
    <HeaderIconButton onClick={onClick}>
      <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
    </HeaderIconButton>
  )
}
