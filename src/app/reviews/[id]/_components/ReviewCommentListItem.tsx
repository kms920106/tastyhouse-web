'use client'

import { useMemberProfile } from '@/hooks/useMemberProfile'
import ReviewCommentItem from './ReviewCommentItem'
import ReviewReplyItem from './ReviewReplyItem'
import type { ReviewComment } from '@/domains/review'

interface Props {
  comment: ReviewComment
}

export default function ReviewCommentListItem({ comment }: Props) {
  const { memberProfile } = useMemberProfile()
  const currentMemberId = memberProfile?.id ?? null

  return (
    <div>
      <ReviewCommentItem comment={comment} currentMemberId={currentMemberId} />
      {comment.replies.length > 0 && (
        <div className="ml-[34px] mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <ReviewReplyItem
              key={reply.id}
              reply={reply}
              parentCommentId={comment.id}
              currentMemberId={currentMemberId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
