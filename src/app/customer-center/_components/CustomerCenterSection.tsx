'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppButton from '@/components/ui/AppButton'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import Image from 'next/image'
import Link from 'next/link'

export default function CustomerCenterSection() {
  return (
    <section className="min-h-screen">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>고객센터</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection>
          <div className="px-[15px] py-10 pb-[30px]">
            <p className="text-[26px] leading-[26px] text-center">1234-5678</p>
            <div className="pt-5 pb-[30px] flex flex-col gap-[7px] items-center">
              <p className="text-sm leading-[14px] text-[#666666]">
                평일 09:00 ~ 18:00 (점심시간 13:00 ~ 14:00)
              </p>
              <p className="text-sm leading-[14px] text-[#666666]">(토/일/공휴일 휴무)</p>
            </div>
            <AppButton asChild className="bg-[#333333] text-white">
              <Link href="tel:1234-5678">전화 문의</Link>
            </AppButton>
          </div>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <div className="px-[15px] py-[31px]">
            <p className="text-sm leading-[14px]">고객센터 이용 안내</p>
            <div className="mt-5 flex flex-col gap-[7px]">
              <p className="text-sm leading-[14px] text-[#666666]">
                • 이전 고객님의 상담이 길어질 경우 통화가 지연될 수 있습니다.
              </p>
              <p className="text-sm leading-relaxed text-[#666666]">
                • 전화가 지연될 경우 카카오톡 문의를 통해 연락처와 통화가 가능한 시간대를 남겨주시면
                확인 후 바로 연락을 드립니다.
              </p>
              <p className="text-sm leading-[14px] text-[#666666]">
                • 카카오톡 문의를 이용해주시면 빠른 답변이 가능합니다.
              </p>
            </div>
            <div className="mt-[30px]">
              <AppButton className=" bg-[#fddc3f] text-black gap-1" onClick={() => {}}>
                <Image src="/images/icon-kakao.png" alt="카카오톡" width={30} height={30} />
                카카오톡 문의
              </AppButton>
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
