import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeService } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ReactNode } from 'react'
import PlaceSummary from './PlaceSummary'

interface PlaceSummaryServerProps {
  placeId: number
  bookmarkButton: ReactNode
}

export default async function PlaceSummaryServer({
  placeId,
  bookmarkButton,
}: PlaceSummaryServerProps) {
  // API 호출
  const { error, data } = await placeService.getPlaceSummary(placeId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('기본 정보')} />
  }

  const { id, name, roadAddress, lotAddress, rating } = data

  return (
    <PlaceSummary
      id={id}
      name={name}
      roadAddress={roadAddress}
      lotAddress={lotAddress}
      rating={rating}
      bookmarkButton={bookmarkButton}
    />
  )
}
