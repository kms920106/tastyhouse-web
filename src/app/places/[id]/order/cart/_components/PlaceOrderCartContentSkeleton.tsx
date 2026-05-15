import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { Skeleton } from '@/components/ui/shadcn/skeleton'

function CartSelectionControlSkeleton() {
  return (
    <div className="flex items-center p-[15px]">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-16 h-[14px]" />
        <Skeleton className="w-10 h-[12px]" />
      </div>
      <Skeleton className="ml-auto w-6 h-[12px]" />
    </div>
  )
}

function CartItemSkeleton() {
  return (
    <div className="flex py-5">
      <Skeleton className="w-5 h-5 rounded-full shrink-0" />
      <Skeleton className="ml-2.5 w-[65px] h-[65px] shrink-0" />
      <div className="flex-1 ml-4">
        <Skeleton className="w-3/4 h-[14px]" />
        <Skeleton className="mt-[15px] w-20 h-[16px]" />
      </div>
      <div className="flex flex-col items-end justify-between">
        <Skeleton className="w-5 h-5" />
        <Skeleton className="w-[90px] h-[30px]" />
      </div>
    </div>
  )
}

function CartItemListSkeleton() {
  return (
    <>
      <div className="px-[15px] divide-y divide-[#f2f2f2]">
        <Skeleton className="my-5 w-32 h-[16px]" />
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
      <div className="py-[18px] border-t border-[#f2f2f2]">
        <div className="flex items-center justify-center gap-2.5">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-24 h-[14px]" />
        </div>
      </div>
    </>
  )
}

function PaymentSummarySkeleton() {
  return (
    <div className="px-[15px] py-5 border-t-8 border-[#f5f5f5] box-border">
      <div className="space-y-5">
        <div className="flex justify-between">
          <Skeleton className="w-16 h-[14px]" />
          <Skeleton className="w-20 h-[14px]" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-24 h-[14px]" />
          <Skeleton className="w-20 h-[14px]" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="w-24 h-[14px]" />
          <Skeleton className="w-24 h-[16px]" />
        </div>
      </div>
    </div>
  )
}

export default function PlaceOrderCartContentSkeleton() {
  return (
    <>
      <SectionStack>
        <BorderedSection>
          <CartSelectionControlSkeleton />
        </BorderedSection>
        <BorderedSection>
          <CartItemListSkeleton />
        </BorderedSection>
      </SectionStack>
      <PaymentSummarySkeleton />
    </>
  )
}
