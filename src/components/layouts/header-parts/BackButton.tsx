'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  onClick?: () => void
}

export default function BackButton({ onClick }: Props) {
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
      <Image src="/images/layout/nav-left-black.png" alt="뒤로가기" width={9} height={16} />
    </button>
  )
}
