import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function Loading() {
  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>예약내역</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        {/* ReservationStatusHeader */}
        <BorderedSection>
          <div className="px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-[13px] w-[120px]" />
            <Skeleton className="h-[25px] w-[60px] rounded-[12.5px]" />
          </div>
        </BorderedSection>

        {/* ReservationShopSection */}
        <BorderedSection>
          <div className="px-[15px] pt-5 pb-[15px]">
            <Skeleton className="h-4 w-[80px] mb-[15px]" />
            <div className="flex flex-col gap-[10px]">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-[13px] w-[180px]" />
            </div>
          </div>
        </BorderedSection>

        {/* ReservationInformationAccordion */}
        <BorderedSection>
          <div className="px-[15px] py-5 flex items-center justify-between">
            <Skeleton className="h-4 w-[70px]" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="px-[15px] py-2.5 pb-5">
            <div className="space-y-[15px]">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex">
                  <Skeleton className="h-[14px] w-[100px] mr-4" />
                  <Skeleton className="h-[14px] w-[120px]" />
                </div>
              ))}
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
