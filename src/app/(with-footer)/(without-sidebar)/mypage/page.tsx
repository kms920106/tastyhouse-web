import { getIsLoggedIn } from '@/lib/auth-config'
import MyPage, { MyPageTabValue } from './_components/MyPage'

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ searchParams }: Props) {
  const [isLoggedIn, params] = await Promise.all([getIsLoggedIn(), searchParams])
  const initialTab = (params.tab || 'reviews') as MyPageTabValue

  return <MyPage initialTab={initialTab} isLoggedIn={isLoggedIn} />
}
