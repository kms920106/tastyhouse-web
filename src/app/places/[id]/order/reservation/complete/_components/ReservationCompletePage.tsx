import { Suspense } from 'react'
import ReservationCompleteContent from './ReservationCompleteContent'
import ReservationCompleteHeader from './ReservationCompleteHeader'
import ReservationCompleteSkeleton from './ReservationCompleteSkeleton'

interface Props {
  shopId: number
  reservationId: number
}

export default function ReservationCompletePage({ shopId, reservationId }: Props) {
  return (
    <>
      <ReservationCompleteHeader />
      <Suspense fallback={<ReservationCompleteSkeleton />}>
        <ReservationCompleteContent shopId={shopId} reservationId={reservationId} />
      </Suspense>
    </>
  )
}
