'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import PlaceInfoSection from './PlaceInfoSection'
import PlaceMenuListSection from './PlaceMenuListSection'
import PlacePhotoListSection from './PlacePhotoListSection'
import ReviewSection from './ReviewSection'

type TabValue = 'info' | 'menu' | 'photo'

interface PlaceTabSectionProps {
  placeId: number
  initialTab: TabValue
}

export default function PlaceTabSection({ placeId, initialTab }: PlaceTabSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname],
  )

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="w-full">
      <div className="sticky top-[60px] bg-white z-40">
        <TabsList className="w-full h-auto p-0 bg-white border-0">
          <TabsTrigger
            value="info"
            className="flex-1 p-0 py-[18px] text-sm leading-[14px] text-[#333333]/40 border-b border-b-[#eeeeee]! rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-black data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-b-0 data-[state=active]:border-l-[#eeeeee] data-[state=active]:border-r-[#eeeeee] data-[state=active]:shadow-none"
          >
            정보
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="flex-1 p-0 py-[18px] text-sm leading-[14px] text-[#333333]/40 border-b border-b-[#eeeeee]! rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-black data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-b-0 data-[state=active]:border-l-[#eeeeee] data-[state=active]:border-r-[#eeeeee] data-[state=active]:shadow-none"
          >
            메뉴
          </TabsTrigger>
          <TabsTrigger
            value="photo"
            className="flex-1 p-0 py-[18px] text-sm leading-[14px] text-[#333333]/40 border-b border-b-[#eeeeee]! rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-black data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-b-0 data-[state=active]:border-l-[#eeeeee] data-[state=active]:border-r-[#eeeeee] data-[state=active]:shadow-none"
          >
            포토
          </TabsTrigger>
          <TabsTrigger
            value="review"
            className="flex-1 p-0 py-[18px] text-sm leading-[14px] text-[#333333]/40 border-b border-b-[#eeeeee]! rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-black data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-l data-[state=active]:border-b-0 data-[state=active]:border-l-[#eeeeee] data-[state=active]:border-r-[#eeeeee] data-[state=active]:shadow-none"
          >
            리뷰
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <PlaceInfoSection placeId={placeId} />
        </TabsContent>
        <TabsContent value="menu">
          <PlaceMenuListSection placeId={placeId} />
        </TabsContent>
        <TabsContent value="photo">
          <PlacePhotoListSection placeId={placeId} />
        </TabsContent>
        <TabsContent value="review">
          <ReviewSection placeId={placeId} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
