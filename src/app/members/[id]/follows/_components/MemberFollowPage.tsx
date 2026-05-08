import MemberFollowHeader from './MemberFollowHeader'
import MemberFollowTabs from './MemberFollowTabs'

export type FollowTabValue = 'following' | 'follower'

interface Props {
  memberId: number
  initialTab: FollowTabValue
  isLoggedIn: boolean
  isOwner: boolean
}

export default async function MemberFollowPage({ memberId, initialTab, isLoggedIn, isOwner }: Props) {
  return (
    <>
      <MemberFollowHeader memberId={memberId} />
      <MemberFollowTabs memberId={memberId} initialTab={initialTab} isLoggedIn={isLoggedIn} isOwner={isOwner} />
    </>
  )
}
