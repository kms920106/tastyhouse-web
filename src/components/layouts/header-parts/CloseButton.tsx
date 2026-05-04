'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HeaderIconButton from './HeaderIconButton'

interface Props {
  onClick?: () => void
}

export default function CloseButton({ onClick }: Props) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <HeaderIconButton onClick={handleClick}>
      <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
    </HeaderIconButton>
  )
}
