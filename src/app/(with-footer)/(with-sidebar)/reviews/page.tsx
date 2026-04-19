import ReviewTabs from './_components/ReviewTabs'

interface ReviewPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function ReviewPage({ searchParams }: ReviewPageProps) {
  const params = await searchParams
  const initialTab = (params.tab || 'all') as 'all' | 'following'

  return <ReviewTabs initialTab={initialTab} />
}
