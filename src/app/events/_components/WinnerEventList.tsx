'use client'

import { WinnerEventListItem } from '@/domains/event/event.type'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

const DUMMY_WINNER_EVENTS: WinnerEventListItem[] = [
  {
    id: 1,
    name: '[당첨자 발표] 설날 특별 이벤트 - 상품권 증정',
    announcedAt: '2026-02-05T00:00:00',
    content:
      '당첨을 진심으로 축하드립니다!\n\n당첨자분들께는 개별 문자로 안내드릴 예정입니다.\n경품 수령을 위해 7일 이내에 연락 부탁드립니다.\n\n■ 당첨자 명단\n- 홍길동 (010-****-1234)\n- 김철수 (010-****-5678)\n- 이영희 (010-****-9012)',
  },
  {
    id: 2,
    name: '[당첨자 발표] 신메뉴 출시 기념 리뷰 이벤트',
    announcedAt: '2026-01-20T00:00:00',
    content:
      '소중한 리뷰를 남겨주신 모든 분들께 감사드립니다!\n\n당첨자분들께는 등록하신 이메일로 기프티콘이 발송될 예정입니다.\n\n■ 당첨자 명단\n- 박민준 (010-****-3456)\n- 최수진 (010-****-7890)',
  },
  {
    id: 3,
    name: '[당첨자 발표] 크리스마스 포토 이벤트',
    announcedAt: '2025-12-30T00:00:00',
    content:
      '참여해 주신 모든 분들께 감사드립니다.\n당첨자분들께 개별 연락을 드릴 예정이오니 확인 부탁드립니다.\n\n■ 당첨자 명단\n- 정다은 (010-****-2345)\n- 강지훈 (010-****-6789)\n- 윤서연 (010-****-0123)',
  },
]

export default function WinnerEventList() {
  const events = DUMMY_WINNER_EVENTS

  return (
    <AccordionPrimitive.Root type="multiple" className="divide-y divide-[#eeeeee]">
      {events.map((event) => (
        <AccordionPrimitive.Item key={event.id} value={String(event.id)} className="border-none">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="w-full flex items-start justify-between px-[16px] py-[18px] [&[data-state=open]>img]:rotate-180 group">
              <div className="flex flex-col items-start gap-3">
                <span className="text-sm leading-[14px]">{event.name}</span>
                <span className="text-[13px] leading-[13px] text-[#999999]">
                  {event.announcedAt.slice(0, 10)}
                </span>
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
            <p className="text-[13px] leading-[22px] p-[25px] whitespace-pre-line bg-[#f9f9f9]">
              {event.content}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
