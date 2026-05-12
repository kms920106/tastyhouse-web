'use client'

import SectionStack from '@/components/ui/SectionStack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import type { ProductMenuOptionGroup } from '@/domains/product'
import { useState } from 'react'
import PlaceOrderMenuDetailOptionList from './PlaceOrderMenuDetailOptionList'
import PlaceOrderMenuDetailReviewContent from './PlaceOrderMenuDetailReviewContent'

interface Props {
  productId: number
  optionGroups: ProductMenuOptionGroup[]
  reviewCount: number
  selectedOptions: Record<number, number | number[]>
  onRadioSelect: (groupId: number, optionId: number) => void
  onCheckboxToggle: (groupId: number, optionId: number, maxSelect: number) => void
}

export default function PlaceOrderMenuDetailProductOptionTabs({
  productId,
  optionGroups,
  reviewCount,
  selectedOptions,
  onRadioSelect,
  onCheckboxToggle,
}: Props) {
  const [activeTab, setActiveTab] = useState('options')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
      <TabsList className="sticky top-0 w-full h-[50px] p-0 rounded-none bg-white z-40 border-0 shadow-none">
        <TabsTrigger
          value="options"
          className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
        >
          옵션
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
        >
          리뷰 ({reviewCount})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="options" className="mt-0">
        <SectionStack>
          <PlaceOrderMenuDetailOptionList
            optionGroups={optionGroups}
            selectedOptions={selectedOptions}
            onRadioSelect={onRadioSelect}
            onCheckboxToggle={onCheckboxToggle}
          />
        </SectionStack>
      </TabsContent>
      <TabsContent value="reviews" className="mt-0">
        <SectionStack>
          <PlaceOrderMenuDetailReviewContent productId={productId} />
        </SectionStack>
      </TabsContent>
    </Tabs>
  )
}
