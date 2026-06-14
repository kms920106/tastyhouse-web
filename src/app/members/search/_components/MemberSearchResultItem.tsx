'use client'

import MemberProfileCell from '@/components/members/MemberProfileCell'
import FollowButton from '@/components/ui/FollowButton'
import { SocialMember } from '@/domains/member'

interface Props {
  member: SocialMember
  onFollowToggle: (member: SocialMember) => void
}

export default function MemberSearchResultItem({ member, onFollowToggle }: Props) {
  return (
    <div className="flex items-center justify-between">
      <MemberProfileCell
        nickname={member.nickname}
        memberGrade={member.memberGrade}
        profileImageUrl={member.profileImageUrl}
        href={`/members/${member.memberId}`}
      />
      <FollowButton following={member.following} onClick={() => onFollowToggle(member)} />
    </div>
  )
}
