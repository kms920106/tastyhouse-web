'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import type { PointBalance, PointHistory } from '@/domains/member'

// TODO: API 연동 시 활성화
// import { getPointBalance } from '@/services/point'
// import { getPointHistories } from '@/services/point'

const dummyPointBalance: PointBalance = {
  availablePoints: 1000,
  expiringPoints: 0,
  expiringDate: null,
}

const dummyPointHistories: PointHistory[] = [
  {
    id: 1,
    description: '포토 리뷰 적립금',
    date: '2020.10.05',
    amount: 1000,
    type: 'earn',
  },
  {
    id: 2,
    description: '주문 결제시 사용',
    date: '2020.10.04',
    amount: -3000,
    type: 'spend',
  },
  {
    id: 3,
    description: '신규 회원가입 이벤트 적립금',
    date: '2020.10.02',
    amount: 3000,
    type: 'earn',
  },
]

export default function PointSection() {
  // TODO: API 연동 시 활성화
  // const pointBalance = await getPointBalance()
  // const pointHistories = await getPointHistories()
  const pointBalance = dummyPointBalance
  const pointHistories = dummyPointHistories

  return (
    <section className="min-h-screen bg-[#f9f9f9]">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>포인트 내역</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <div className="py-[30px] text-center">
            <p className="text-xs leading-[12px]">사용 가능 포인트</p>
            <p className="mt-2.5 text-[23px] leading-[23px] text-[#a91201]">
              {pointBalance.availablePoints.toLocaleString()} p
            </p>
            <p className="text-xs leading-[12px] text-[#aaaaaa] mt-[15px]">
              이번달 소멸 예정 포인트{' '}
              <span className="text-[#666666]">{pointBalance.expiringPoints}p</span>
            </p>
          </div>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          {pointHistories.length > 0 ? (
            <div className="px-[16px] divide-y divide-[#f2f2f2]">
              {pointHistories.map((history) => (
                <div key={history.id} className="py-[20px]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-sm leading-[14px] text-gray-900">{history.description}</p>
                      <p className="text-[11px] leading-none text-[#aaaaaa]">{history.date}</p>
                    </div>
                    <p
                      className={`text-sm leading-[14px] ${
                        history.type === 'earn' ? 'text-[#a91201]' : 'text-gray-900'
                      }`}
                    >
                      {history.amount > 0 ? '+' : ''}
                      {history.amount.toLocaleString()} p
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-[#aaaaaa] text-[14px]">포인트 내역이 없습니다.</p>
            </div>
          )}
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
