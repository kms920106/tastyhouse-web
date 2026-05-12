import { getIsLoggedIn } from '@/lib/auth-config'
import MyPage, { MyPageTabValue } from './_components/MyPage'

interface Props {
  searchParams: Promise<{
    tab?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const [isLoggedIn, { tab }] = await Promise.all([getIsLoggedIn(), searchParams])
  const initialTab = (tab || 'reviews') as MyPageTabValue

  return <MyPage initialTab={initialTab} isLoggedIn={isLoggedIn} />
}
