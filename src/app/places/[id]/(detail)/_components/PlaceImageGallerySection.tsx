import { Suspense } from 'react'
import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import PlaceImageGalleryServer from './PlaceImageGalleryServer'

interface Props {
  placeId: number
}

export default function PlaceImageGallerySection({ placeId }: Props) {
  return (
    <section>
      <Suspense fallback={<ImageGallerySkeleton />}>
        <PlaceImageGalleryServer placeId={placeId} />
      </Suspense>
    </section>
  )
}
