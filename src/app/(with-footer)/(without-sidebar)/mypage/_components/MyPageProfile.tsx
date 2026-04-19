'use client'

import MemberProfileCard from '@/components/member/MemberProfileCard'
import PenIcon from '@/components/ui/PenIcon'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import Link from 'next/link'

export default function MyPageProfile() {
  const { memberProfile } = useMemberProfile()

  return (
    <MemberProfileCard
      memberId={memberProfile?.id ?? null}
      editSlot={
        <Link href="/account/profile">
          <PenIcon />
        </Link>
      }
    />
  )
}
