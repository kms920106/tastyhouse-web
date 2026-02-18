import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { getMyPointHistory } from '@/services/member'

export default async function PointSection() {
  const { data } = await getMyPointHistory()
  const pointHistory = data?.data

  return (
    <section className="min-h-screen">
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
              {(pointHistory?.availablePoints ?? 0).toLocaleString()} p
            </p>
            <p className="text-xs leading-[12px] text-[#aaaaaa] mt-[15px]">
              이번달 소멸 예정 포인트{' '}
              <span className="text-[#666666]">{pointHistory?.expiredThisMonth ?? 0}p</span>
            </p>
          </div>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          {pointHistory && pointHistory.histories.length > 0 ? (
            <div className="px-4 divide-y divide-[#f2f2f2]">
              {pointHistory.histories.map((history, index) => (
                <div key={index} className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2.5">
                      <p className="text-sm leading-[14px] text-gray-900">{history.reason}</p>
                      <p className="text-[11px] leading-[11px] text-[#aaaaaa]">{history.date}</p>
                    </div>
                    <p
                      className={`text-sm leading-[14px] ${
                        history.pointType === 'EARNED' ? 'text-[#a91201]' : 'text-gray-900'
                      }`}
                    >
                      {history.pointType === 'EARNED' ? '+' : '-'}
                      {history.pointAmount.toLocaleString()} p
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm leading-[14px] text-[#aaaaaa]">포인트 내역이 없습니다.</p>
            </div>
          )}
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
