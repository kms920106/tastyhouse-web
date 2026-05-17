import { Suspense } from 'react'
import { PlaceDetailBookmarkButtonSkeleton } from './PlaceDetailBookmarkButtonSkeleton'
import PlaceDetailBookmarkButtonServer from './PlaceDetailBookmarkButtonServer'
import { PlaceDetailSummarySkeleton } from './PlaceDetailSummarySkeleton'
import PlaceDetailSummaryServer from './PlaceDetailSummaryServer'

interface Props {
  placeId: number
}

export default function PlaceDetailSummaryContent({ placeId }: Props) {
  return (
    <div className="px-[15px] py-5">
      <Suspense fallback={<PlaceDetailSummarySkeleton />}>
        <PlaceDetailSummaryServer
          placeId={placeId}
          bookmarkButton={
            <Suspense fallback={<PlaceDetailBookmarkButtonSkeleton />}>
              <PlaceDetailBookmarkButtonServer placeId={placeId} />
            </Suspense>
          }
        />
      </Suspense>
    </div>
  )
}
