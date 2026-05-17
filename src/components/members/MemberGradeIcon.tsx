import { getMemberGradeIcon, getMemberGradeName } from '@/domains/member'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'

interface Props {
  grade: MemberGradeCode
  size?: number
}

export default function MemberGradeIcon({ grade, size = 14 }: Props) {
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
