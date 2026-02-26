import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
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
          <Skeleton className="w-16 h-[17px]" />
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0 px-[15px] py-5">
          <div className="flex flex-col gap-2.5">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-24 h-4" />
          </div>
        </BorderedSection>
        <BorderedSection className="px-[15px] py-5">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-28 h-5" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Skeleton className="w-[60px] h-[60px] rounded-md flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="w-3/4 h-4" />
                  <Skeleton className="w-1/2 h-3" />
                  <Skeleton className="w-1/3 h-4" />
                </div>
              </div>
            ))}
          </div>
        </BorderedSection>
        <BorderedSection className="px-[15px] py-5">
          <div className="flex justify-between items-center">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-4 h-4" />
          </div>
        </BorderedSection>
        <BorderedSection className="px-[15px] py-5">
          <div className="flex justify-between items-center">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-4 h-4" />
          </div>
        </BorderedSection>
        <BorderedSection className="px-[15px] py-5">
          <div className="flex justify-between items-center">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-4 h-4" />
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
