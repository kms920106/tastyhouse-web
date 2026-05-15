'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { usePlaceFilterState } from './PlaceFilterStateProvider'

export default function PlaceFilterApplyButton() {
  const { hasSelection, handleApplyFilter } = usePlaceFilterState()

  return (
    <AppPrimaryButton onClick={handleApplyFilter} disabled={!hasSelection}>
      필터 적용
    </AppPrimaryButton>
  )
}
