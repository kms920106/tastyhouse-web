'use client'

import { useSidebar } from '@/components/ui/shadcn/sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'

interface Props {
  onClick?: () => void
}

export default function MenuButton({ onClick }: Props) {
  const { setOpenMobile } = useSidebar()

  const handleClick = () => {
    onClick?.()
    setOpenMobile(true)
  }

  return (
    <button
      onClick={handleClick}
      className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
    >
      <RxHamburgerMenu size={22} className="white" />
    </button>
  )
}
