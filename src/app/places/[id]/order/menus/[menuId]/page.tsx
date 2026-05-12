import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import PlaceOrderMenuDetailPage from './_components/PlaceOrderMenuDetailPage'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
}

export default async function Page({ params }: Props) {
  const [{ id, menuId }, isLoggedIn] = await Promise.all([params, getIsLoggedIn()])

  const placeId = Number(id)
  const productId = Number(menuId)

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return <PlaceOrderMenuDetailPage placeId={placeId} productId={productId} />
}
