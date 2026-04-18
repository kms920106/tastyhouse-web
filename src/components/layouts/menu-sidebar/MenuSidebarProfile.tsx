'use client'

import { MemberGradeCode } from '@/domains/member'
import Avatar from '../../ui/Avatar'
import MemberGradeBadge from '../../ui/MemberGradeBadge'
import MemberGradeIcon from '../../ui/MemberGradeIcon'
import MemberGradeName from '../../ui/MemberGradeName'
import MemberNickname from '../../ui/MemberNickname'

const USER_GRADE: MemberGradeCode = 'GOURMET'
const USER_POINT = 2147

export default function MenuSidebarProfile() {
  const profileImageUrl = '/images/sample/profile/default.png'
  const nickname = '테스트'

  return (
    <div className="flex items-start gap-3 px-[15px] mt-10">
      {/* 프로필 이미지 */}
      <Avatar src={profileImageUrl} alt={nickname} />
      <div className="flex flex-col gap-2 min-w-0">
        {/* 닉네임 */}
        <MemberNickname>{nickname}</MemberNickname>
        <div className="flex gap-1">
          {/* 등급 */}
          <MemberGradeBadge
            gradeIcon={<MemberGradeIcon grade={USER_GRADE} size={14} />}
            gradeName={<MemberGradeName grade={USER_GRADE} size="sm" />}
          />

          {/* 리뷰 개수 */}
          <p className="text-sm leading-[14px]">
            (리뷰 <span className="font-bold">{USER_POINT.toLocaleString()}</span>개)
          </p>
        </div>
      </div>
    </div>
  )
}
