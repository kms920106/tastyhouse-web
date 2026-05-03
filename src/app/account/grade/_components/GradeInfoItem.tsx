import { getMemberGradeColor, getMemberGradeIcon } from '@/constants/member'
import type { MemberGradeCode } from '@/domains/member'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface GradeInfo {
  grade: MemberGradeCode
  displayName: string
  minReviewCount: number
  maxReviewCount: number | null
}

interface Props {
  gradeInfo: GradeInfo
}

export default function GradeInfoItem({ gradeInfo }: Props) {
  const { grade, displayName, minReviewCount, maxReviewCount } = gradeInfo

  const isLowestGrade = maxReviewCount !== null && minReviewCount === 0

  return (
    <div className="flex items-center gap-4 p-5 border border-[#eeeeee]">
      <Image
        src={`/images/rank/icon-level-${getMemberGradeIcon(grade)}-40.png`}
        alt={displayName}
        width={40}
        height={42}
      />
      <div className="flex flex-col gap-2.5">
        <p className={cn('text-base leading-[16px] font-bold', getMemberGradeColor(grade))}>
          {displayName}
        </p>
        <p className="text-sm leading-[14px]">
          {isLowestGrade ? (
            <>
              리뷰 작성 개수 <span className="font-bold">{maxReviewCount!.toLocaleString()}</span>{' '}
              개 이하
            </>
          ) : (
            <>
              리뷰 작성 개수 <span className="font-bold">{minReviewCount.toLocaleString()}</span> 개
              이상
            </>
          )}
        </p>
      </div>
    </div>
  )
}
