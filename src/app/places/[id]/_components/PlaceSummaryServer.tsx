import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from '@/domains/place'
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
  const { error, data } = await placeRepository.getPlaceSummary(placeId)

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

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
