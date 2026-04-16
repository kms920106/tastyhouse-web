import { getMemberGradeIcon, getMemberGradeName } from '@/constants/member'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'

interface MemberGradeIconProps {
  grade: MemberGradeCode
  size?: number
}

export default function MemberGradeIcon({ grade, size = 14 }: MemberGradeIconProps) {
  const gradeIcon = getMemberGradeIcon(grade)
  const gradeName = getMemberGradeName(grade)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={`/images/rank/icon-level-${gradeIcon}-40.png`}
        alt={gradeName}
        fill
        style={{ objectFit: 'contain' }}
        sizes={`${size}px`}
      />
    </div>
  )
}
