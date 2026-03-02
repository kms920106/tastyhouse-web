'use client'

import OrderProductItem from '@/components/order/OrderProductItem'
import PhotoUploader from '@/components/reviews/PhotoUploader'
import ReviewTextarea from '@/components/reviews/ReviewTextarea'
import TagInput from '@/components/reviews/TagInput'
import AppFormField from '@/components/ui/AppFormField'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { extractZodFieldErrors } from '@/lib/form'
import { uploadFile } from '@/services/file'
import { createOrderReview } from '@/services/review'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FaStar } from 'react-icons/fa'
import { z } from 'zod'

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

const reviewSchema = z.object({
  ratings: z
    .object({
      taste: z.number(),
      amount: z.number(),
      price: z.number(),
    })
    .refine(({ taste, amount, price }) => taste > 0 && amount > 0 && price > 0, {
      message: '평점을 선택해 주세요.',
    }),
  content: z.string().min(1, '내용을 입력해 주세요.'),
  tags: z.array(z.string()),
})

type FormData = z.infer<typeof reviewSchema>

type FormErrors = Partial<Record<'ratings' | 'content', string>>

const INITIAL_FORM_DATA: FormData = {
  ratings: { taste: 0, amount: 0, price: 0 },
  content: '',
  tags: [],
}

interface OrderReviewCreateFormProps {
  orderItemId: number
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
}

export default function OrderReviewCreateForm({
  orderItemId,
  productId,
  productName,
  productImageUrl,
  productPrice,
}: OrderReviewCreateFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [photos, setPhotos] = useState<File[]>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  const [isUploading, startUploading] = useTransition()
  const [isSubmitting, startSubmitting] = useTransition()

  const handleRatingChange = (key: 'taste' | 'amount' | 'price', value: number) => {
    setFormData((prev) => ({ ...prev, ratings: { ...prev.ratings, [key]: value } }))
    if (errors.ratings) {
      setErrors((prev) => ({ ...prev, ratings: undefined }))
    }
  }

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }))
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: undefined }))
    }
  }

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handlePhotosChange = (files: File[]) => {
    const newFiles = files.slice(photos.length)

    if (newFiles.length === 0) {
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

  const validateForm = (): boolean => {
    const trimmedData = {
      ...formData,
      content: formData.content.trim(),
    }
    const result = reviewSchema.safeParse(trimmedData)

    if (result.success) {
      setErrors({})
      return true
    }

    const fieldErrors = extractZodFieldErrors(result.error) as FormErrors

    // ratings refine 에러는 path가 없으므로 별도 처리
    const ratingsIssue = result.error.issues.find(
      (issue) => issue.path.length === 0 || issue.path[0] === 'ratings',
    )
    if (ratingsIssue && !fieldErrors.ratings) {
      fieldErrors.ratings = ratingsIssue.message
    }

    setErrors(fieldErrors)
    return false
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      toast('작성하지 않은 항목이 있습니다. 확인해 주세요.')
      return
    }

    startSubmitting(async () => {
      const { error } = await createOrderReview({
        orderItemId,
        productId,
        tasteRating: formData.ratings.taste,
        amountRating: formData.ratings.amount,
        priceRating: formData.ratings.price,
        content: formData.content,
        uploadedFileIds: uploadedPhotos.map((p) => p.fileId),
        tags: formData.tags,
      })

      if (error) {
        toast('리뷰 등록에 실패했습니다.')
        return
      }

      toast('리뷰가 등록되었습니다.')
      router.back()
    })
  }

  return (
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
        <div className="px-[15px] divide-y divide-[#eeeeee]">
          {RATING_CATEGORIES.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-5 py-[30px]">
              <p className="text-base leading-[16px]">{label}</p>
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
                      className={
                        star <= formData.ratings[key] ? 'text-[#a91201]' : 'text-[#eeeeee]'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
          {errors.ratings && (
            <p className="text-xs leading-[12px] text-[#bc4040] py-3">{errors.ratings}</p>
          )}
        </div>
      </BorderedSection>
      <BorderedSection>
        <div className="flex flex-col gap-5 px-[15px] py-[30px]">
          <AppFormField label="내용" required error={errors.content}>
            {({ className }) => (
              <ReviewTextarea
                value={formData.content}
                onChange={handleContentChange}
                error={!!errors.content}
                className={className}
              />
            )}
          </AppFormField>
          <AppFormField label="사진">
            {() => <PhotoUploader value={photos} onChange={handlePhotosChange} />}
          </AppFormField>
          <div className="px-4 py-6">
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li className="text-xs text-[#666666]">
                해당 음식과 무관한 사진을 첨부한 리뷰는 통보없이 삭제 및 적립 혜택이 취소될 수
                있습니다.
              </li>
            </ul>
          </div>
          <AppFormField label="태그">
            {() => <TagInput value={formData.tags} onChange={handleTagsChange} />}
          </AppFormField>
        </div>
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
      <BorderedSection>
        <div className="p-[15px]">
          <AppSubmitButton
            onClick={handleSubmit}
            disabled={isUploading}
            isSubmitting={isSubmitting}
            loadingText="등록 중..."
          >
            등록하기
          </AppSubmitButton>
        </div>
      </BorderedSection>
    </SectionStack>
  )
}
