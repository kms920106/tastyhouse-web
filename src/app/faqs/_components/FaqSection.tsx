'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { FaqCategory, FaqListItem } from '@/domains/faq'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

// TODO: API 연동 후 제거 예정 더미 데이터
const DUMMY_FAQ_LIST: FaqListItem[] = [
  {
    id: 1,
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.\n\n'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 2,
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.\n\n'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 3,
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.\n\n'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 4,
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.\n\n'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 5,
    category: '취소/환불',
    question: '주문취소를 하고싶어요.',
    answer: `주문 직후, '주문 완료' 상태에서는 마이페이지에서 직접 주문 취소가 가능합니다. 단, 부분 취소가 불가능하므로 전체 취소 후, 원하는 상품으로 재주문 해주셔야합니다.\n\n'결제 완료' 상태에서는 업체 정책에 따라 취소가 불가할 수 있습니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 6,
    category: '주문/결제',
    question: '결제 수단을 변경하고 싶어요.',
    answer: `주문 완료 후 결제 수단 변경은 불가합니다.\n\n변경을 원하시는 경우 기존 주문을 취소하신 후 새로운 결제 수단으로 재주문 해주시기 바랍니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 7,
    category: '주문/결제',
    question: '영수증을 발급받고 싶어요.',
    answer: `마이페이지 > 주문 내역에서 해당 주문의 상세 페이지로 이동 후 영수증 발급 버튼을 통해 발급하실 수 있습니다.\n\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 8,
    category: '회원정보',
    question: '비밀번호를 잊어버렸어요.',
    answer: `로그인 페이지에서 '비밀번호 찾기'를 통해 가입 시 등록한 이메일로 임시 비밀번호를 발급받으실 수 있습니다.\n\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 9,
    category: '회원정보',
    question: '회원 탈퇴를 하고 싶어요.',
    answer: `마이페이지 > 설정 > 회원탈퇴 메뉴를 통해 탈퇴하실 수 있습니다.\n\n탈퇴 시 보유하신 포인트 및 쿠폰은 즉시 소멸되며 복구가 불가합니다.\n추가 문의 사항은 고객센터(02-1234-5678)로 연락바랍니다.`,
  },
  {
    id: 10,
    category: '기타',
    question: '앱에서 오류가 발생했어요.',
    answer: `앱을 최신 버전으로 업데이트 후 재실행해 주세요.\n\n문제가 지속될 경우 고객센터(02-1234-5678)로 연락 주시면 빠르게 도와드리겠습니다.`,
  },
]

const CATEGORIES: FaqCategory[] = ['전체', '주문/결제', '취소/환불', '회원정보', '기타']

interface FaqSectionProps {
  initialCategory: FaqCategory
}

export default function FaqSection({ initialCategory }: FaqSectionProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>(initialCategory)

  // TODO: API 연동 후 getFaqList 서버 액션으로 교체
  const filteredFaqs =
    selectedCategory === '전체'
      ? DUMMY_FAQ_LIST
      : DUMMY_FAQ_LIST.filter((faq) => faq.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="relative flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2" aria-label="뒤로가기">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">
            자주하는 질문
          </h1>
        </div>
      </header>

      {/* 카테고리 탭 */}
      <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
        <Swiper slidesPerView="auto" spaceBetween={8} className="px-4 py-3">
          {CATEGORIES.map((category) => (
            <SwiperSlide key={category} style={{ width: 'auto' }}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-[15px] font-medium rounded-md whitespace-nowrap border ${
                  selectedCategory === category
                    ? 'text-[#a11c20] border-[#a11c20]'
                    : 'text-[#aaaaaa] border-[#eeeeee]'
                }`}
              >
                {category}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FAQ 아코디언 리스트 */}
      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={String(faq.id)} className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50">
              <div className="flex flex-col items-start gap-2 text-left pr-4">
                <div className="flex items-start gap-3">
                  <span className="text-[14px] text-[#a11c20] font-medium flex-shrink-0">
                    {faq.category}
                  </span>
                  <h2 className="text-[15px] text-gray-900 font-normal leading-tight">
                    {faq.question}
                  </h2>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-5">
                <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
