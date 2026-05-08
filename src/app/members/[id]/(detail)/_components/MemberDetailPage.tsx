import MemberProfileCard from '@/components/member/MemberProfileCard'
import MemberDetailHeader from './MemberDetailHeader'
import MemberDetailTabs from './MemberDetailTabs'

interface Props {
  memberId: number
  isLoggedIn: boolean
}

export default function MemberDetailPage({ memberId, isLoggedIn }: Props) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MemberDetailHeader memberId={memberId} isLoggedIn={isLoggedIn} />
        <MemberProfileCard memberId={memberId} />
      </div>
      <MemberDetailTabs memberId={memberId} />
    </div>
  )
}
