'use client'

import { toast } from '@/components/ui/AppToaster'
import { toggleReviewLike } from '@/services/review'
import { useState, useTransition } from 'react'
import ReviewLikeButton from './ReviewLikeButton'

interface ReviewLikeButtonClientProps {
  initialIsLiked: boolean
  reviewId: number
}

export default function ReviewLikeButtonClient({
  initialIsLiked,
  reviewId,
}: ReviewLikeButtonClientProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    if (isPending) return

    startTransition(async () => {
      const { error, data } = await toggleReviewLike(reviewId)

      if (error || !data) {
        toast(error || '좋아요 처리에 실패했습니다.')
        return
      }

      const { liked } = data.data

      setIsLiked(liked)
    })
  }

  return <ReviewLikeButton onClick={handleLike} isLiked={isLiked} disabled={isPending} />
}
