'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import OrderProductItem from '@/components/order/OrderProductItem'
import PhotoUploader from '@/components/reviews/PhotoUploader'
import ReviewInput from '@/components/reviews/ReviewInput'
import TagInput from '@/components/reviews/TagInput'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface RatingCategory {
  key: 'taste' | 'amount' | 'price'
  label: string
}

const RATING_CATEGORIES: RatingCategory[] = [
  { key: 'taste', label: '맛은 어떤가요?' },
  { key: 'amount', label: '양은 어떤가요?' },
  { key: 'price', label: '가격은 어떤가요?' },
]

interface OrderReviewCreateSectionProps {
  productName: string
  productImageUrl: string
  productPrice: number
}

export default function OrderReviewCreateSection({
  productName,
  productImageUrl,
  productPrice,
}: OrderReviewCreateSectionProps) {
  const [ratings, setRatings] = useState<Record<'taste' | 'amount' | 'price', number>>({
    taste: 0,
    amount: 0,
    price: 0,
  })
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [tags, setTags] = useState<string[]>([])

  const handleRatingChange = (key: 'taste' | 'amount' | 'price', value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    if (!content) {
      toast('내용은 필수 입력 사항입니다.')
      return
    }

    // TODO: 리뷰 생성 API 연동
    toast('리뷰 등록 기능은 준비 중입니다.')
  }

  return (
    <section className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>리뷰 작성</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <div className="px-4">
            <OrderProductItem
              productName={productName}
              productImageUrl={productImageUrl}
              unitPrice={productPrice}
            />
          </div>
        </BorderedSection>
        <BorderedSection>
          <div className="divide-y divide-[#eeeeee]">
            {RATING_CATEGORIES.map(({ key, label }) => (
              <div key={key} className="flex flex-col items-center gap-4 py-6">
                <p className="text-base">{label}</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(key, star)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <FaStar
                        size={40}
                        className={star <= ratings[key] ? 'text-[#a91201]' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BorderedSection>
        <BorderedSection>
          <ReviewInput value={content} onChange={setContent} />
        </BorderedSection>
        <BorderedSection>
          <PhotoUploader value={photos} onChange={setPhotos} />
        </BorderedSection>
        <BorderedSection>
          <div className="px-4 py-6">
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li className="text-xs text-[#666666]">
                해당 음식과 무관한 사진을 첨부한 리뷰는 통보없이 삭제 및 적립 혜택이 취소될 수
                있습니다.
              </li>
            </ul>
          </div>
        </BorderedSection>
        <BorderedSection>
          <TagInput value={tags} onChange={setTags} />
        </BorderedSection>
        <BorderedSection>
          <div className="px-4 py-6">
            <p className="text-gray-900 mb-3">리뷰 작성시 포인트 적립 및 주의사항</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li className="text-xs text-[#666666]">
                일반(평점 및 내용)리뷰 작성시 <span className="text-[#a91201]">100p 적립</span>
              </li>
              <li className="text-xs text-[#666666]">
                포토리뷰 작성시 <span className="text-[#a91201]">200p 적립</span>
              </li>
              <li className="text-xs text-[#666666]">
                주문한 상품별로 리뷰 작성이 가능하며, 동일 상품 여러개 구매시 최소 1회의 한해 포인트
                적립
              </li>
              <li className="text-xs text-[#666666]">리뷰 삭제 후 재작성시 포인트 미지급</li>
            </ul>
          </div>
        </BorderedSection>
      </SectionStack>
      <button
        type="button"
        className="w-full py-4 text-base leading-[16px] bg-[#a91201] text-white cursor-pointer"
        onClick={handleSubmit}
      >
        등록하기
      </button>
    </section>
  )
}
