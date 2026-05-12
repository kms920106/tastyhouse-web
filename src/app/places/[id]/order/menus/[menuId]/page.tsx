import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import PlaceOrderMenuDetailPage from './_components/PlaceOrderMenuDetailPage'
import type { PlaceOrderMenuDetailTabValue } from './_components/PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id, menuId }, { tab }, isLoggedIn] = await Promise.all([
    params,
    searchParams,
    getIsLoggedIn(),
  ])

  const placeId = Number(id)
  const productId = Number(menuId)
  const initialTab = (tab || 'reviews') as PlaceOrderMenuDetailTabValue

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return (
    <PlaceOrderMenuDetailPage placeId={placeId} productId={productId} initialTab={initialTab} />
  )
}
