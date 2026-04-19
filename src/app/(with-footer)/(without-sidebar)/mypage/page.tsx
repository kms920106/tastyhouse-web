import MyPageContent, { MyPageTabValue } from './_components/MyPageContent'

interface MyPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function MyPage({ searchParams }: MyPageProps) {
  const params = await searchParams
  const initialTab = (params.tab || 'reviews') as MyPageTabValue

  return <MyPageContent initialTab={initialTab} />
}
