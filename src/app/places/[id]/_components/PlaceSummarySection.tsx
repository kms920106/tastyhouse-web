import { Suspense } from 'react'
import { PlaceBookmarkButtonSkeleton } from './PlaceBookmarkButtonSkeleton'
import PlaceBookmarkButtonServer from './PlaceBookmarkButtonServer'
import { PlaceSummarySkeleton } from './PlaceSummarySkeleton'
import PlaceSummaryServer from './PlaceSummaryServer'

interface Props {
  placeId: number
}

export default function PlaceSummarySection({ placeId }: Props) {
  return (
    <section className="px-[15px] py-5">
      <Suspense fallback={<PlaceSummarySkeleton />}>
        <PlaceSummaryServer
          placeId={placeId}
          bookmarkButton={
            <Suspense fallback={<PlaceBookmarkButtonSkeleton />}>
              <PlaceBookmarkButtonServer placeId={placeId} />
            </Suspense>
          }
        />
      </Suspense>
    </section>
  )
}
