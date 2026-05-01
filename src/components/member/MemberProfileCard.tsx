import MemberProfileInfo from '@/components/member/MemberProfileInfo'
import MemberProfileStats from '@/components/member/MemberProfileStats'
import { ReactNode } from 'react'

interface Props {
  memberId: number | null
  editSlot?: ReactNode
}

export default function MemberProfileCard({ memberId, editSlot }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <MemberProfileInfo memberId={memberId} editSlot={editSlot} />
      <MemberProfileStats memberId={memberId} />
    </div>
  )
}
