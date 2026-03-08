import MemberProfileInfo from '@/components/member/MemberProfileInfo'
import MemberProfileStats from '@/components/member/MemberProfileStats'
import { ReactNode } from 'react'

interface MemberProfileCardProps {
  memberId: number
  editSlot?: ReactNode
}

export default function MemberProfileCard({ memberId, editSlot }: MemberProfileCardProps) {
  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <MemberProfileInfo memberId={memberId} editSlot={editSlot} />
      <MemberProfileStats memberId={memberId} />
    </div>
  )
}
