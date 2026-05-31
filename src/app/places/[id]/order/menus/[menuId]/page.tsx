import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import ShopOrderMenuDetailPage from './_components/ShopOrderMenuDetailPage'
import type { ProductOrderMenuDetailTab } from './_components/ShopOrderMenuDetailProductOptionTabs'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
  searchParams: Promise<{
    tab?: string
  }>
}

const PRODUCT_MENU_DETAIL_TAB_VALUES: ProductOrderMenuDetailTab[] = ['options', 'reviews']

function parseProductMenuDetailTab(value: string | undefined): ProductOrderMenuDetailTab {
  return PRODUCT_MENU_DETAIL_TAB_VALUES.includes(value as ProductOrderMenuDetailTab)
    ? (value as ProductOrderMenuDetailTab)
    : 'options'
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id, menuId }, { tab }, isLoggedIn] = await Promise.all([
    params,
    searchParams,
    getIsLoggedIn(),
  ])

  const shopId = Number(id)
  const productId = Number(menuId)
  const initialTab = parseProductMenuDetailTab(tab)

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return (
    <ShopOrderMenuDetailPage shopId={shopId} productId={productId} tab={initialTab} />
  )
}
