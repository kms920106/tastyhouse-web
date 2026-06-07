import { parseOrderMethodType } from '@/domains/order'
import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import ShopOrderMenuPage from './_components/ShopOrderMenuPage'

interface Props {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    orderMethod?: string
  }>
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, { orderMethod }, isLoggedIn] = await Promise.all([
    params,
    searchParams,
    getIsLoggedIn(),
  ])
  const shopId = Number(id)

  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  const resolvedOrderMethod = parseOrderMethodType(orderMethod)
  if (!resolvedOrderMethod) {
    redirect(PAGE_PATHS.ORDER_METHOD(shopId))
  }

  return <ShopOrderMenuPage shopId={shopId} orderMethod={resolvedOrderMethod} />
}
