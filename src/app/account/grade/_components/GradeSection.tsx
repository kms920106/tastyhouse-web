import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberGradeIcon from '@/components/ui/MemberGradeIcon'
import MemberGradeName from '@/components/ui/MemberGradeName'
import SectionStack from '@/components/ui/SectionStack'
import { getMemberGradeColor, getMemberGradeIcon } from '@/constants/member'
import { GradeInfo } from '@/domains/grade'
import { gradeRepository } from '@/domains/grade/grade.repository'
import { memberRepository } from '@/domains/member/member.repository'
import type { MemberGradeCode } from '@/domains/member'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default async function GradeSection() {
  const [meResult, myGradeResult, gradeInfoListResult] = await Promise.all([
    memberRepository.getMemberMe(),
    memberRepository.getMyGrade(),
    gradeRepository.getGradeInfoList(),
  ])

  const me = meResult.data
  const myGrade = myGradeResult.data
  const gradeInfoList = gradeInfoListResult.data ?? []

  return (
    <section className="min-h-screen">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>등급</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection>
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
                  리뷰 <span className="font-bold">{myGrade.reviewsNeededForNextGrade}</span> 개
                  추가 작성 시
                  <MemberGradeBadge
                    gradeIcon={<MemberGradeIcon grade={myGrade.nextGrade} size={14} />}
                    gradeName={<MemberGradeName grade={myGrade.nextGrade} size="sm" bold />}
                  />
                  달성
                </div>
                <p className="mt-2.5 text-xs leading-[12px] text-[#999999]">
                  현재 작성 리뷰 수{' '}
                  <span className="font-bold">{myGrade.currentReviewCount} 개</span>
                </p>
              </div>
            )}
          </div>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <div className="px-[15px] py-[25px]">
            <h2 className="text-[17px] leading-[17px] font-bold text-gray-900">
              등급 세부 조건 안내
            </h2>
            <p className="mt-2.5 text-xs leading-[12px] text-[#999999]">
              리뷰 작성 수에 따라 등급이 변경됩니다.
            </p>

            <div className="flex flex-col gap-[13px] mt-[25px]">
              {gradeInfoList.map((item: GradeInfo) => (
                <div
                  key={item.grade}
                  className="flex items-center gap-4 p-5 border border-[#eeeeee]"
                >
                  <Image
                    src={`/images/rank/icon-level-${getMemberGradeIcon(item.grade as MemberGradeCode)}-40.png`}
                    alt={item.displayName}
                    width={40}
                    height={42}
                  />
                  <div className="flex flex-col gap-2.5">
                    <p
                      className={cn(
                        'text-base leading-[16px] font-bold',
                        getMemberGradeColor(item.grade as MemberGradeCode),
                      )}
                    >
                      {item.displayName}
                    </p>
                    <p className="text-sm leading-[14px]">
                      {item.maxReviewCount !== null && item.minReviewCount === 0 ? (
                        <>
                          리뷰 작성 개수{' '}
                          <span className="font-bold">{item.maxReviewCount.toLocaleString()}</span>{' '}
                          개 이하
                        </>
                      ) : (
                        <>
                          리뷰 작성 개수{' '}
                          <span className="font-bold">{item.minReviewCount.toLocaleString()}</span>{' '}
                          개 이상
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
