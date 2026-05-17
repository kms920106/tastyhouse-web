'use client'

import ImageLightbox from '@/components/reviews/ImageLightbox'
import ImageSwiper from '@/components/reviews/ImageSwiper'
import { useState } from 'react'

interface Props {
  imageUrls: string[]
}

export default function PlaceImageGallery({ imageUrls }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (imageUrls.length === 0) return null

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <ImageSwiper imageUrls={imageUrls} onImageClick={openLightbox} />
      <ImageLightbox
        imageUrls={imageUrls}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
