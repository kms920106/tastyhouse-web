import FetchErrorState from '@/components/ui/FetchErrorState'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberGradeIcon from '@/components/ui/MemberGradeIcon'
import MemberGradeName from '@/components/ui/MemberGradeName'
import type { MemberGradeCode } from '@/domains/member'
import { getMemberGradeColor, getMemberGradeIcon } from '@/domains/member'
import { memberRepository } from '@/domains/member/member.repository'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default async function GradeCurrentSection() {
  const [meResult, myGradeResult] = await Promise.all([
    memberRepository.getMemberMe(),
    memberRepository.getMyGrade(),
  ])

  if (meResult.error || myGradeResult.error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const me = meResult.data
  const myGrade = myGradeResult.data

  return (
    <div className="px-[15px] pt-10 pb-5 text-center">
      <p className="text-base leading-[16px]">
        <span className="font-bold">{me?.nickname}</span> 님의 현재 등급은
      </p>
      {myGrade && (
        <div className="flex justify-center mt-[23px]">
          <Image
            src={`/images/rank/icon-level-${getMemberGradeIcon(myGrade.currentGrade as MemberGradeCode)}-120.png`}
            alt={myGrade.currentGradeDisplayName}
            width={73}
            height={75}
          />
        </div>
      )}
      {myGrade && (
        <p
          className={cn(
            'mt-5 text-[23px] leading-[23px] font-bold',
            getMemberGradeColor(myGrade.currentGrade as MemberGradeCode),
          )}
        >
          {myGrade.currentGradeDisplayName}
        </p>
      )}
      {myGrade && myGrade.nextGrade && (
        <div className="mt-[30px] py-5 bg-[#fcfcfc] border border-[#eeeeee] box-border">
          <div className="flex items-center justify-center flex-wrap gap-x-0.5 text-sm leading-[14px]">
            리뷰 <span className="font-bold">{myGrade.reviewsNeededForNextGrade}</span> 개 추가 작성
            시
            <MemberGradeBadge
              gradeIcon={<MemberGradeIcon grade={myGrade.nextGrade} size={14} />}
              gradeName={<MemberGradeName grade={myGrade.nextGrade} size="sm" bold />}
            />
            달성
          </div>
          <p className="mt-2.5 text-xs leading-[12px] text-[#999999]">
            현재 작성 리뷰 수 <span className="font-bold">{myGrade.currentReviewCount} 개</span>
          </p>
        </div>
      )}
    </div>
  )
}
