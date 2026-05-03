import MyPageContent, { MyPageTabValue } from './_components/MyPageContent'

interface Props {
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const initialTab = (params.tab || 'reviews') as MyPageTabValue

  return <MyPageContent initialTab={initialTab} />
}
