import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { FaPencilAlt } from 'react-icons/fa'

export default function ReviewButton() {
  return (
    <Link href={PAGE_PATHS.REVIEW_CREATE}>
      <button className="absolute bottom-4 right-4 z-50 p-3 bg-white text-black rounded-full shadow">
        <FaPencilAlt size={20} />
      </button>
    </Link>
  )
}
