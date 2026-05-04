import ReviewPage from './_components/ReviewPage'
import { TabValue } from './_components/ReviewTabs'

interface Props {
  searchParams: Promise<{
    tab?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  const initialTab = (params.tab || 'all') as TabValue

  return <ReviewPage initialTab={initialTab} />
}
