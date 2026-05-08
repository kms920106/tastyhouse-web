'use client'

import MemberProfileCard from '@/components/member/MemberProfileCard'
import PenIcon from '@/components/ui/PenIcon'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

export default function MyPageProfile() {
  const { memberProfile } = useMemberProfile()

  return (
    <MemberProfileCard
      memberId={memberProfile?.id ?? null}
      editSlot={
        <Link href={PAGE_PATHS.ACCOUNT_PROFILE}>
          <PenIcon />
        </Link>
      }
    />
  )
}
