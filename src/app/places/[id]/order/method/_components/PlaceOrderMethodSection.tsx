'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppButton from '@/components/ui/AppButton'
import type { OrderMethod, OrderMethodItem } from '@/domains/order'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PlaceOrderMethodSectionProps {
  placeId: number
  orderMethods: OrderMethodItem[]
}

export default function PlaceOrderMethodSection({
  placeId,
  orderMethods,
}: PlaceOrderMethodSectionProps) {
  const router = useRouter()

  const [selectedMethod, setSelectedMethod] = useState<OrderMethod | null>(null)

  const handleNext = () => {
    if (selectedMethod) {
      router.push(PAGE_PATHS.ORDER_MENUS(placeId, selectedMethod))
    }
  }

  const methodConfigMap: Record<OrderMethod, { title: string; imageOff: string; imageOn: string }> =
    {
      TABLE_ORDER: {
        title: '바로 주문하기',
        imageOff: '/images/place/method/icon-table-off.png',
        imageOn: '/images/place/method/icon-table-on.png',
      },
      RESERVATION: {
        title: '예약하기',
        imageOff: '/images/place/method/icon-reservation-off.png',
        imageOn: '/images/place/method/icon-reservation-on.png',
      },
      DELIVERY: {
        title: '배달하기',
        imageOff: '/images/place/icon-delivery-off.png',
        imageOn: '/images/place/icon-delivery-on.png',
      },
      TAKEOUT: {
        title: '포장하기',
        imageOff: '/images/place/method/icon-packaging-off.png',
        imageOn: '/images/place/method/icon-packaging-on.png',
      },
    }

  // 순서대로 정렬
  const methodOrder: OrderMethod[] = ['TABLE_ORDER', 'RESERVATION', 'DELIVERY', 'TAKEOUT']
  const sortedOrderMethods = [...orderMethods].sort(
    (a, b) => methodOrder.indexOf(a.code) - methodOrder.indexOf(b.code),
  )

  const methods = sortedOrderMethods.map((method) => ({
    id: method.code,
    title: methodConfigMap[method.code].title,
    imageOff: methodConfigMap[method.code].imageOff,
    imageOn: methodConfigMap[method.code].imageOn,
  }))

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header variant="white" height={55}>
          <HeaderLeft>
            <BackButton />
          </HeaderLeft>
          <HeaderCenter>
            <HeaderTitle>주문방법 선택</HeaderTitle>
          </HeaderCenter>
        </Header>
        <div className="flex-1 flex flex-col justify-center px-[15px]">
          <div className="flex flex-col gap-[21px] text-center">
            <h2 className="text-[23px] leading-[23px]">원하시는 주문방법을 선택해주세요.</h2>
            <p className="text-sm leading-[21px] text-[#999999]">
              가게 사정에 따라 가능한 주문방법이 달라질 수 있으며,
              <br />
              자세한 사항은 가게 정보를 확인해주세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[15px] mt-[60px]">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer ${
                  selectedMethod === method.id ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]'
                }`}
                style={{ aspectRatio: '165/100' }}
              >
                <div className="relative flex items-center justify-center w-full h-12 mb-2.5">
                  <Image
                    src={selectedMethod === method.id ? method.imageOn : method.imageOff}
                    alt={method.title}
                    width={32}
                    height={32}
                    className="object-contain max-w-full max-h-full"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <span
                  className={`text-[13px] leading-[13px] ${
                    selectedMethod === method.id ? 'text-main' : 'text-[#cccccc]'
                  }`}
                >
                  {method.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-[15px] py-2.5">
          <AppButton className="bg-main" onClick={handleNext} disabled={!selectedMethod}>
            다음
          </AppButton>
        </div>
      </div>
    </>
  )
}
