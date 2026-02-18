'use client'

import Header, {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { RxReload } from 'react-icons/rx'

interface FilterHeaderSectionProps {
  onReset: () => void
}

export default function FilterHeaderSection({ onReset }: FilterHeaderSectionProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <HeaderTitle>필터</HeaderTitle>
      </HeaderCenter>
      <HeaderRight>
        <button
          className="w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
          onClick={onReset}
        >
          <RxReload size={20} />
        </button>
      </HeaderRight>
    </Header>
  )
}
