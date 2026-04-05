'use client'

import ImageLightbox from '@/components/reviews/ImageLightbox'
import ImageSwiper from '@/components/reviews/ImageSwiper'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useState } from 'react'

export function ImageGallerySkeleton() {
  return <Skeleton className="aspect-[345/190] w-full rounded-none" />
}

interface ImageGalleryProps {
  imageUrls: string[]
}

export default function ImageGallery({ imageUrls }: ImageGalleryProps) {
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
