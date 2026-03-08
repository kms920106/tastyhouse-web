import { cn } from '@/lib/utils'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

interface PlaceBookmarkButtonProps {
  onClick?: () => void
  disabled?: boolean
  isBookmarked: boolean
}

export default function PlaceBookmarkButton({
  onClick,
  disabled,
  isBookmarked,
}: PlaceBookmarkButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center w-[35px] h-[35px] shrink-0 border rounded-full cursor-pointer box-border',
        isBookmarked ? 'border-main' : 'border-[#eeeeee]',
      )}
      disabled={disabled}
    >
      {isBookmarked ? (
        <FaBookmark size={16} className="text-main" />
      ) : (
        <FaRegBookmark size={16} className="text-[#eeeeee]" />
      )}
    </button>
  )
}
