import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place/place.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { ReactNode } from 'react'
import PlaceSummary from './PlaceSummary'

interface Props {
  placeId: number
  bookmarkButton: ReactNode
}

export default async function PlaceSummaryServer({ placeId, bookmarkButton }: Props) {
  const { error, status, data } = await placeRepository.getPlaceDetail(placeId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('기본 정보')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
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
