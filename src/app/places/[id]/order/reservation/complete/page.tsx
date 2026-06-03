import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import ReservationCompletePage from './_components/ReservationCompletePage'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ reservationId?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, { reservationId }, isLoggedIn] = await Promise.all([
    params,
    searchParams,
    getIsLoggedIn(),
  ])

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  const shopId = Number(id)
  const parsedReservationId = Number(reservationId)

  if (!parsedReservationId) {
    redirect(PAGE_PATHS.ORDER_RESERVATION(shopId))
  }

  return <ReservationCompletePage shopId={shopId} reservationId={parsedReservationId} />
}
