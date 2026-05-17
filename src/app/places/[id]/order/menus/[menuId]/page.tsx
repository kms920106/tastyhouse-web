import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import PlaceOrderMenuDetailPage from './_components/PlaceOrderMenuDetailPage'
import type { ProductMenuDetailTab } from './_components/PlaceOrderMenuDetailProductOptionTabs'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
  searchParams: Promise<{
    tab?: string
  }>
}

const PRODUCT_MENU_DETAIL_TAB_VALUES: ProductMenuDetailTab[] = ['options', 'reviews']

function parseProductMenuDetailTab(value: string | undefined): ProductMenuDetailTab {
  return PRODUCT_MENU_DETAIL_TAB_VALUES.includes(value as ProductMenuDetailTab)
    ? (value as ProductMenuDetailTab)
    : 'options'
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id, menuId }, { tab }, isLoggedIn] = await Promise.all([
    params,
    searchParams,
    getIsLoggedIn(),
  ])

  const placeId = Number(id)
  const productId = Number(menuId)
  const initialTab = parseProductMenuDetailTab(tab)

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return (
    <PlaceOrderMenuDetailPage placeId={placeId} productId={productId} initialTab={initialTab} />
  )
}
