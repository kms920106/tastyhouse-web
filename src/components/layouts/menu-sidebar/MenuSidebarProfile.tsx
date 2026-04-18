'use client'

import { useMemberProfile } from '@/hooks/useMemberProfile'
import { useMyReviewCount } from '@/hooks/useMyReviewCount'
import Avatar from '../../ui/Avatar'
import MemberGradeBadge from '../../ui/MemberGradeBadge'
import MemberGradeIcon from '../../ui/MemberGradeIcon'
import MemberGradeName from '../../ui/MemberGradeName'
import MemberNickname from '../../ui/MemberNickname'

export default function MenuSidebarProfile() {
  const { memberProfile } = useMemberProfile()
  const { reviewCount } = useMyReviewCount()

  if (!memberProfile) return null

  const { nickname, grade, profileImageUrl } = memberProfile

  return (
    <div className="flex items-start gap-3 px-[15px] mt-10">
      <Avatar src={profileImageUrl ?? '/images/sample/profile/default.png'} alt={nickname} />
      <div className="flex flex-col gap-2 min-w-0">
        <MemberNickname>{nickname}</MemberNickname>
        <div className="flex gap-1">
          <MemberGradeBadge
            gradeIcon={<MemberGradeIcon grade={grade} size={14} />}
            gradeName={<MemberGradeName grade={grade} size="sm" />}
          />
          <p className="text-sm leading-[14px]">
            (리뷰 <span className="font-bold">{reviewCount}</span>개)
          </p>
        </div>
      </div>
    </div>
  )
}
