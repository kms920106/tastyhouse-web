import MemberFollowHeader from './MemberFollowHeader'
import MemberFollowTabs, { type MemberFollowTab } from './MemberFollowTabs'

interface Props {
  memberId: number
  initialTab: MemberFollowTab
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
