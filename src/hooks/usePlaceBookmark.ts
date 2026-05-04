import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { togglePlaceBookmark } from '@/actions/place'
import { useState, useTransition } from 'react'

interface Props {
  placeId: number
  initialIsBookmarked: boolean
}

export default function usePlaceBookmark({ placeId, initialIsBookmarked }: Props) {
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
