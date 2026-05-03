'use client'

import type { OrderMethodType, OrderMethod } from '@/domains/order'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const METHOD_CONFIG: Record<OrderMethodType, { title: string; imageOff: string; imageOn: string }> =
  {
    TABLE_ORDER: {
      title: '바로 주문하기',
      imageOff: '/images/place/order-method/icon-table-off.png',
      imageOn: '/images/place/order-method/icon-table-on.png',
    },
    RESERVATION: {
      title: '예약하기',
      imageOff: '/images/place/order-method/icon-reservation-off.png',
      imageOn: '/images/place/order-method/icon-reservation-on.png',
    },
    DELIVERY: {
      title: '배달하기',
      imageOff: '/images/place/order-method/icon-delivery-off.png',
      imageOn: '/images/place/order-method/icon-delivery-on.png',
    },
    TAKEOUT: {
      title: '포장하기',
      imageOff: '/images/place/order-method/icon-packaging-off.png',
      imageOn: '/images/place/order-method/icon-packaging-on.png',
    },
  }

const METHOD_ORDER: OrderMethodType[] = ['TABLE_ORDER', 'RESERVATION', 'DELIVERY', 'TAKEOUT']

interface Props {
  orderMethods: OrderMethod[]
  selectedMethod: OrderMethodType | null
  onSelect: (method: OrderMethodType) => void
}

export default function OrderMethodGrid({ orderMethods, selectedMethod, onSelect }: Props) {
  const methods = [...orderMethods]
    .sort((a, b) => METHOD_ORDER.indexOf(a.code) - METHOD_ORDER.indexOf(b.code))
    .map((method) => ({ id: method.code, ...METHOD_CONFIG[method.code] }))

  return (
    <div className="grid grid-cols-2 gap-[15px] mt-[60px]">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={cn(
            'flex flex-col items-center justify-center px-5 py-[17px] border box-border cursor-pointer',
            selectedMethod === method.id ? 'bg-[#f8f5f4] border-main' : 'border-[#eeeeee]',
          )}
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
            className={cn(
              'text-[13px] leading-[13px]',
              selectedMethod === method.id ? 'text-main' : 'text-[#cccccc]',
            )}
          >
            {method.title}
          </span>
        </button>
      ))}
    </div>
  )
}
