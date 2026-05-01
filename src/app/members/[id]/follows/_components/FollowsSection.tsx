import FollowsHeader from './FollowsHeader'
import FollowsTabs from './FollowsTabs'

export type FollowTabValue = 'following' | 'follower'

interface Props {
  memberId: number
  initialTab: FollowTabValue
}

export default async function FollowsSection({ memberId, initialTab }: Props) {
  return (
    <section className="min-h-screen bg-white">
      <FollowsHeader memberId={memberId} />
      <FollowsTabs memberId={memberId} initialTab={initialTab} />
    </section>
  )
}
