'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'yet-another-react-lightbox/styles.css'

import { useState } from 'react'

import 'yet-another-react-lightbox/plugins/counter.css'
import { Skeleton } from '../ui/shadcn/skeleton'
import ImageLightbox from './ImageLightbox'
import ImageSwiper from './ImageSwiper'

export function ReviewImageGallerySkeleton() {
  return <Skeleton className="aspect-[345/190] w-full rounded-none" />
}

interface ReviewImageGalleryProps {
  imageUrls: string[]
}

export default function ReviewImageGallery({ imageUrls }: ReviewImageGalleryProps) {
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
