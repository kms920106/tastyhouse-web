'use client'

import PenIcon from '@/components/ui/PenIcon'
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
      <Avatar src={profileImageUrl} alt={nickname} />
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-[2.5px]">
          <MemberNickname size="md">{nickname}</MemberNickname>
          <PenIcon />
        </div>
        <div className="flex items-end gap-[1px]">
          <MemberGradeBadge
            gradeIcon={<MemberGradeIcon grade={grade} size={14} />}
            gradeName={<MemberGradeName grade={grade} size="sm" bold />}
          />
          <p className="text-xs leading-[12px]">
            (리뷰 <span className="font-bold">{reviewCount}</span>개)
          </p>
        </div>
      </div>
    </div>
  )
}
