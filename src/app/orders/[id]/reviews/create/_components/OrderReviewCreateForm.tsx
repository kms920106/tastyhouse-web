'use client'

import OrderProductItem from '@/components/order/OrderProductItem'
import PhotoUploader from '@/components/reviews/PhotoUploader'
import ReviewInput from '@/components/reviews/ReviewInput'
import TagInput from '@/components/reviews/TagInput'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { uploadFile } from '@/services/file'
import { createOrderReview } from '@/services/review'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
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

interface UploadedPhoto {
  previewUrl: string
  fileId: number
}

interface OrderReviewCreateFormProps {
  orderId: number
  orderItemId: number
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
}

export default function OrderReviewCreateForm({
  orderId,
  orderItemId,
  productId,
  productName,
  productImageUrl,
  productPrice,
}: OrderReviewCreateFormProps) {
  const router = useRouter()
  const [ratings, setRatings] = useState<Record<'taste' | 'amount' | 'price', number>>({
    taste: 0,
    amount: 0,
    price: 0,
  })
  const [content, setContent] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [isUploading, startUploading] = useTransition()
  const [isSubmitting, startSubmitting] = useTransition()

  const handleRatingChange = (key: 'taste' | 'amount' | 'price', value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePhotosChange = (files: File[]) => {
    const newFiles = files.slice(photos.length)

    if (newFiles.length === 0) {
      // 삭제된 경우: photos 길이 기준으로 uploadedPhotos도 동기화
      setPhotos(files)
      setUploadedPhotos((prev) => prev.slice(0, files.length))
      return
    }

    setPhotos(files)

    startUploading(async () => {
      try {
        const results = await Promise.all(
          newFiles.map(async (file) => {
            const response = await uploadFile(file)

            if (!response?.data) {
              throw new Error('사진 업로드에 실패했습니다.')
            }

            return { previewUrl: URL.createObjectURL(file), fileId: response.data.fileId }
          }),
        )

        setUploadedPhotos((prev) => [...prev, ...results])
      } catch {
        toast('사진 업로드 중 오류가 발생했습니다.')
        setPhotos((prev) => prev.slice(0, prev.length - newFiles.length))
      }
    })
  }

  const handleSubmit = () => {
    if (ratings.taste === 0 || ratings.amount === 0 || ratings.price === 0) {
      toast('모든 항목의 평점을 선택해주세요.')
      return
    }

    if (!content.trim()) {
      toast('내용은 필수 입력 사항입니다.')
      return
    }

    startSubmitting(async () => {
      const { error } = await createOrderReview({
        orderItemId,
        productId,
        tasteRating: ratings.taste,
        amountRating: ratings.amount,
        priceRating: ratings.price,
        content,
        uploadedFileIds: uploadedPhotos.map((p) => p.fileId),
        tags,
      })

      if (error) {
        toast('리뷰 등록에 실패했습니다.')
        return
      }

      toast('리뷰가 등록되었습니다.')
      router.replace(`/orders/${orderId}`)
    })
  }

  return (
    <>
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
          <PhotoUploader value={photos} onChange={handlePhotosChange} />
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
        disabled={isSubmitting || isUploading}
        className="w-full py-4 text-base leading-[16px] bg-[#a91201] text-white cursor-pointer disabled:opacity-60"
        onClick={handleSubmit}
      >
        {isSubmitting ? '등록 중...' : '등록하기'}
      </button>
    </>
  )
}
