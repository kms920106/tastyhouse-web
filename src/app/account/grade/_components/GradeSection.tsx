import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { getMemberGradeColor, getMemberGradeIcon } from '@/constants/member'
import { MemberGradeCode } from '@/domains/member'
import { getGradeInfoList, getMyGrade } from '@/services/grade'
import { getMemberMe } from '@/services/member'
import Image from 'next/image'

export default async function GradeSection() {
  const [meResult, myGradeResult, gradeInfoListResult] = await Promise.all([
    getMemberMe(),
    getMyGrade(),
    getGradeInfoList(),
  ])

  const me = meResult.data?.data
  const myGrade = myGradeResult.data?.data
  const gradeInfoList = gradeInfoListResult.data?.data ?? []

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
                className={`mt-5 text-[23px] leading-[23px] font-bold ${getMemberGradeColor(myGrade.currentGrade as MemberGradeCode)}`}
              >
                {myGrade.currentGradeDisplayName}
              </p>
            )}
            {myGrade && myGrade.nextGrade && (
              <div className="mt-[30px] py-5 bg-[#fcfcfc] border border-[#eeeeee] box-border">
                <p className="flex items-center justify-center flex-wrap gap-x-0.5 text-sm leading-[14px]">
                  리뷰 <span className="font-bold">{myGrade.reviewsNeededForNextGrade}</span> 개
                  추가 작성 시
                  <Image
                    src={`/images/rank/icon-level-${getMemberGradeIcon(myGrade.nextGrade as MemberGradeCode)}-40.png`}
                    alt={myGrade.nextGrade}
                    width={14}
                    height={15}
                    className="ml-1"
                  />
                  <span
                    className={`font-bold ${getMemberGradeColor(myGrade.nextGrade as MemberGradeCode)}`}
                  >
                    {myGrade.nextGradeDisplayName}
                  </span>{' '}
                  달성
                </p>
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
              {gradeInfoList.map((item) => (
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
                      className={`text-base leading-[16px] font-bold ${getMemberGradeColor(item.grade as MemberGradeCode)}`}
                    >
                      {item.displayName}
                    </p>
                    <p className="text-sm leading-[14px]">
                      {item.maxReviewCount !== null && item.minReviewCount === 0 ? (
                        <>리뷰 작성 개수 <span className="font-bold">{item.maxReviewCount.toLocaleString()}</span> 개 이하</>
                      ) : (
                        <>리뷰 작성 개수 <span className="font-bold">{item.minReviewCount.toLocaleString()}</span> 개 이상</>
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
