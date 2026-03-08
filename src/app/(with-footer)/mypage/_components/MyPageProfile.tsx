'use client'

import MemberProfileCard from '@/components/member/MemberProfileCard'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPageProfile() {
  const { memberProfile } = useMemberProfile()

  const memberId = memberProfile?.id

  if (!memberId) return null

  return (
    <MemberProfileCard
      memberId={memberId}
      editSlot={
        <Link href="/account/profile">
          <Image src="/images/mypage/icon-pen.png" alt="pencil" width={18} height={16} />
        </Link>
      }
    />
  )
}
