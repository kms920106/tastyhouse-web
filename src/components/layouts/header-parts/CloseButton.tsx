'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CloseButtonProps {
  onClick?: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <button
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
    </button>
  )
}
