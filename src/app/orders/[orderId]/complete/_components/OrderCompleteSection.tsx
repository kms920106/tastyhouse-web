'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import type { OrderDetailResponse } from '@/domains/order'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface OrderCompleteSectionProps {
  orderDetail: OrderDetailResponse
}

export default function OrderCompleteSection({ orderDetail }: OrderCompleteSectionProps) {
  const router = useRouter()

  const { id, orderNumber } = orderDetail

  return (
    <section className="flex flex-col min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>결제완료</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="flex-1 flex flex-col items-center justify-center pb-[70px]">
        <div className="relative w-[95px] h-[95px]">
          <Image src="/images/circle.png" alt="" fill className="object-contain" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/images/check.png" alt="결제완료" width={49} height={35} />
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="mt-[30px] text-sm leading-[14px] text-[#666666]">
            주문번호 : {orderNumber}
          </p>
          <h2 className="mt-[15px] text-[23px] leading-[23px]">결제가 완료되었습니다.</h2>
          <p className="mt-[21px] text-sm leading-relaxed text-[#999999]">
            가게 사정에 따라 주문이 취소될 수 있으며,
            <br />
            주문 상세 내역은 마이페이지에서 확인이 가능합니다.
          </p>
        </div>
      </div>
      <FixedBottomSection className="px-[15px] py-[15px]">
        <AppPrimaryButton onClick={() => router.push(`/orders/${id}`)}>
          주문 상세 내역 보기
        </AppPrimaryButton>
      </FixedBottomSection>
    </section>
  )
}
