'use client'

import Image from 'next/image'
import HeaderIconButton from './HeaderIconButton'

interface Props {
  onClick: () => void
}

export default function ClearButton({ onClick }: Props) {
  return (
    <HeaderIconButton type="button" onClick={onClick} aria-label="검색어 초기화">
      <Image src="/images/icon-clear.png" alt="초기화" width={15} height={15} style={{ width: 15, height: 15 }} />
    </HeaderIconButton>
  )
}
