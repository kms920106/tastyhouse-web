import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import MyPage, { MyPageTabValue } from './_components/MyPage'

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ searchParams }: Props) {
  const isLoggedIn = await getIsLoggedIn()
  if (!isLoggedIn) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  const params = await searchParams
  const initialTab = (params.tab || 'reviews') as MyPageTabValue

  return <MyPage initialTab={initialTab} />
}
