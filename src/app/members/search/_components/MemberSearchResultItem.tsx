'use client'

import FollowButton from '@/components/ui/FollowButton'
import MemberProfileCell from '@/components/ui/MemberProfileCell'
import { SocialMember } from '@/domains/member'
import Link from 'next/link'

interface Props {
  member: SocialMember
  onFollowToggle: (member: SocialMember) => void
}

export default function MemberSearchResultItem({ member, onFollowToggle }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Link href={`/members/${member.memberId}`} className="flex-1">
        <MemberProfileCell
          nickname={member.nickname}
          memberGrade={member.memberGrade}
          profileImageUrl={member.profileImageUrl}
        />
      </Link>
      <FollowButton following={member.following} onClick={() => onFollowToggle(member)} />
    </div>
  )
}
