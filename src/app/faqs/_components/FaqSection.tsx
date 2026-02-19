'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { FaqCategoryItem, FaqItem } from '@/domains/faq'
import { getFaqList } from '@/services/faq'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

const ALL_CATEGORY_ID = 0

interface FaqSectionProps {
  initialCategoryId: number
  initialCategories: FaqCategoryItem[]
  initialFaqs: FaqItem[]
}

export default function FaqSection({
  initialCategoryId,
  initialCategories,
  initialFaqs,
}: FaqSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(initialCategoryId)
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs)

  useEffect(() => {
    const fetchFaqs = async () => {
      const params =
        selectedCategoryId !== ALL_CATEGORY_ID ? { categoryId: selectedCategoryId } : undefined
      const response = await getFaqList(params)
      setFaqs(response.data?.data ?? [])
    }

    fetchFaqs()
  }, [selectedCategoryId])

  const getCategoryName = (categoryId: number) => {
    return initialCategories.find((c) => c.id === categoryId)?.name ?? ''
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>자주하는 질문</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
        <Swiper slidesPerView="auto" spaceBetween={8} className="px-4 py-3">
          <SwiperSlide style={{ width: 'auto' }}>
            <button
              onClick={() => setSelectedCategoryId(ALL_CATEGORY_ID)}
              className={`px-5 py-2.5 text-[15px] font-medium rounded-md whitespace-nowrap border ${
                selectedCategoryId === ALL_CATEGORY_ID
                  ? 'text-[#a11c20] border-[#a11c20]'
                  : 'text-[#aaaaaa] border-[#eeeeee]'
              }`}
            >
              전체
            </button>
          </SwiperSlide>
          {initialCategories.map((category) => (
            <SwiperSlide key={category.id} style={{ width: 'auto' }}>
              <button
                onClick={() => setSelectedCategoryId(category.id)}
                className={`px-5 py-2.5 text-[15px] font-medium rounded-md whitespace-nowrap border ${
                  selectedCategoryId === category.id
                    ? 'text-[#a11c20] border-[#a11c20]'
                    : 'text-[#aaaaaa] border-[#eeeeee]'
                }`}
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={String(faq.id)} className="border-b border-gray-100">
            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50">
              <div className="flex flex-col items-start gap-2 text-left pr-4">
                <div className="flex items-start gap-3">
                  <span className="text-[14px] text-[#a11c20] font-medium flex-shrink-0">
                    {getCategoryName(faq.categoryId)}
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
