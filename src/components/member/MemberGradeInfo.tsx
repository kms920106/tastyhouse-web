import { getMemberGradeColor, getMemberGradeIcon, getMemberGradeName } from '@/constants/member'
import { MemberGradeCode } from '@/domains/member'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MemberGradeInfoProps {
  memberGrade: MemberGradeCode | null | undefined
}

export default function MemberGradeInfo({ memberGrade }: MemberGradeInfoProps) {
  const grade = memberGrade ?? 'NEWCOMER'
  const gradeName = getMemberGradeName(grade)
  const gradeIcon = getMemberGradeIcon(grade)
  const gradeColor = getMemberGradeColor(grade)

  return (
    <div className="flex items-center gap-1.5 mt-2">
      <div className="relative w-[14px] h-[14px]">
        <Image
          src={`/images/rank/icon-level-${gradeIcon}-40.png`}
          alt={gradeName}
          fill
          style={{ objectFit: 'contain' }}
          sizes="16px"
        />
      </div>
      <span className={cn('text-sm leading-[14px] font-bold', gradeColor)}>{gradeName}</span>
    </div>
  )
}
