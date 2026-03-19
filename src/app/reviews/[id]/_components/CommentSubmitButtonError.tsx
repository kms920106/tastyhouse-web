'use client'

import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import CommentSubmitButton from './CommentSubmitButton'

export default function CommentSubmitButtonError() {
  const handleClick = () => {
    toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
  }

  return <CommentSubmitButton onClick={handleClick} isSubmitting={false} />
}
