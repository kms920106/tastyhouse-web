import { getMemberGradeColor, getMemberGradeIcon, getMemberGradeName } from '@/constants/member'
import { MemberGradeCode } from '@/domains/member'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MemberGradeBadgeProps {
  grade: MemberGradeCode
}

export default function MemberGradeBadge({ grade }: MemberGradeBadgeProps) {
  const gradeName = getMemberGradeName(grade)
  const gradeIcon = getMemberGradeIcon(grade)
  const gradeColor = getMemberGradeColor(grade)

  return (
    <div className="flex items-center gap-[5px]">
      <div className="relative w-[14px] h-[14px]">
        <Image
          src={`/images/rank/icon-level-${gradeIcon}-40.png`}
          alt={gradeName}
          fill
          style={{ objectFit: 'contain' }}
          sizes="14px"
        />
      </div>
      <span className={cn('text-xs leading-[12px]', gradeColor)}>{gradeName}</span>
    </div>
  )
}
