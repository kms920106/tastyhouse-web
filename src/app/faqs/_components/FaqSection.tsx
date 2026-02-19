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
    <div className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>자주하는 질문</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="pl-[15px] py-5">
        <Swiper slidesPerView="auto" spaceBetween={10}>
          <SwiperSlide style={{ width: 'auto' }}>
            <button
              onClick={() => setSelectedCategoryId(ALL_CATEGORY_ID)}
              className={`px-[13px] py-[13px] text-sm leading-[14px] whitespace-nowrap border ${
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
                className={`px-[13px] py-[13px] text-sm leading-[14px] whitespace-nowrap border ${
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
          <AccordionItem key={faq.id} value={String(faq.id)} className="border-[#eeeeee]">
            <AccordionTrigger
              className="w-full px-[19px] py-[18px] hover:no-underline"
              showIcon={false}
            >
              <div className="flex items-center gap-5">
                <span className="text-sm leading-[14px] text-[#a11c20] flex-shrink-0">
                  {getCategoryName(faq.categoryId)}
                </span>
                <h2 className="text-sm leading-[14px]">{faq.question}</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-[26px] py-6 text-[13px] leading-[13px] bg-[#f9f9f9] whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
