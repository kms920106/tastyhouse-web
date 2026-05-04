import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import OrderMethodPage from './_components/OrderMethodPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const placeId = Number(id)

  const isLoggedIn = await getIsLoggedIn()
  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return <OrderMethodPage placeId={placeId} />
}
