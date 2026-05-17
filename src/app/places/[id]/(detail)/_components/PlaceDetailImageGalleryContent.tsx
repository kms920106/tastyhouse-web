import { ImageGallerySkeleton } from '@/components/ui/ImageGallerySkeleton'
import { Suspense } from 'react'
import PlaceDetailImageGalleryServer from './PlaceDetailImageGalleryServer'

interface Props {
  placeId: number
}

export default function PlaceDetailImageGalleryContent({ placeId }: Props) {
  return (
    <Suspense fallback={<ImageGallerySkeleton />}>
      <PlaceDetailImageGalleryServer placeId={placeId} />
    </Suspense>
  )
}
