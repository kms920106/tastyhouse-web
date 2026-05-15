'use client'

import Header, {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from '@/components/layouts/Header'
import { BackButton, HeaderIconButton } from '@/components/layouts/header-parts'
import { RxReload } from 'react-icons/rx'
import { usePlaceFilterState } from './PlaceFilterStateProvider'

export default function PlaceFilterHeader() {
  const { handleReset } = usePlaceFilterState()

  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <HeaderTitle>필터</HeaderTitle>
      </HeaderCenter>
      <HeaderRight>
        <HeaderIconButton onClick={handleReset}>
          <RxReload size={20} />
        </HeaderIconButton>
      </HeaderRight>
    </Header>
  )
}
