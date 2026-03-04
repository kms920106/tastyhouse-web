import FollowsSection, { FollowTabValue } from './_components/FollowsSection'

interface FollowsPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}

export default async function FollowsPage({ params, searchParams }: FollowsPageProps) {
  const { id } = await params
  const { tab } = await searchParams
  const initialTab = (tab === 'follower' ? 'follower' : 'following') as FollowTabValue

  return <FollowsSection memberId={Number(id)} initialTab={initialTab} />
}
