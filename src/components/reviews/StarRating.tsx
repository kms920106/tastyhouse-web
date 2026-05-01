'use client'

import { FaStar } from 'react-icons/fa'

interface Props {
  value: number
  onChange: (rating: number) => void
}

export default function StarRating({ value, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <FaStar size={48} className={star <= value ? 'text-red-500' : 'text-gray-300'} />
        </button>
      ))}
    </div>
  )
}
