'use client'

import { toast } from '@/components/ui/AppToaster'
import { createComment, createReply } from '@/services/review'
import { useState } from 'react'
import CommentSubmitButton from './CommentSubmitButton'
import { useReply } from './ReplyContext'

interface CommentSubmitButtonClientProps {
  reviewId: number
}

export default function CommentSubmitButtonClient({ reviewId }: CommentSubmitButtonClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { replyTarget, clearReply, commentText, setCommentText, setIsFocused, textareaRef } =
    useReply()

  const handleSubmit = async () => {
    let content = commentText.trim()

    // 답글 모드일 때 @nickname 제거
    if (replyTarget) {
      const mentionPrefix = `@${replyTarget.nickname} `
      if (content.startsWith(mentionPrefix)) {
        content = content.slice(mentionPrefix.length).trim()
      }
    }

    if (!content) {
      toast(replyTarget ? '답글을 입력해 주세요.' : '댓글을 입력해 주세요.')
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)

    if (!replyTarget) {
      // 댓글 등록
      // API 호출
      const request = { content }
      const { error, data } = await createComment(reviewId, request)

      if (error || !data) {
        toast('댓글 등록에 실패했습니다.')
        setIsSubmitting(false)
        return
      }
    } else {
      // 답글 등록
      // API 호출
      const request = {
        content,
        replyToMemberId: replyTarget.memberId,
      }
      const { error, data } = await createReply(reviewId, replyTarget.commentId, request)

      if (error || !data) {
        toast('답글 등록에 실패했습니다.')
        setIsSubmitting(false)
        return
      }
    }

    setCommentText('')
    setIsFocused(false)
    clearReply()
    textareaRef.current?.blur()
    setIsSubmitting(false)
  }

  return <CommentSubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} />
}
