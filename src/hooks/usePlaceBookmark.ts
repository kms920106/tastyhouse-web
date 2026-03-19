import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { togglePlaceBookmark } from '@/services/place'
import { useState, useTransition } from 'react'

interface UsePlaceBookmarkProps {
  placeId: number
  initialIsBookmarked: boolean
}

export default function usePlaceBookmark({ placeId, initialIsBookmarked }: UsePlaceBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isPending, startTransition] = useTransition()

  const toggleBookmark = () => {
    if (isPending) return

    startTransition(async () => {
      const { error, data } = await togglePlaceBookmark(placeId)

      if (error || !data) {
        toast(error || COMMON_ERROR_MESSAGES.MUTATION_ERROR)
        return
      }

      setIsBookmarked(data.bookmarked)
    })
  }

  return { isBookmarked, isPending, toggleBookmark }
}
