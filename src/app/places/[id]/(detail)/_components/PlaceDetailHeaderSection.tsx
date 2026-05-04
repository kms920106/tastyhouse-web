import Header, { HeaderCenter, HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import { PlaceDetailHeaderSkeleton } from './PlaceDetailHeaderSkeleton'
import PlaceDetailHeaderServer from './PlaceDetailHeaderServer'
import ShareButtonServer from './ShareButtonServer'

interface Props {
  placeId: number
}

export default function PlaceDetailHeaderSection({ placeId }: Props) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <Suspense fallback={<PlaceDetailHeaderSkeleton />}>
          <PlaceDetailHeaderServer placeId={placeId} />
        </Suspense>
      </HeaderCenter>
      <HeaderRight>
        <ShareButtonServer placeId={placeId} />
      </HeaderRight>
    </Header>
  )
}
