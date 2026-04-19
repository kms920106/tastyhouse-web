import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankHeader, { RankHeaderSkeleton } from './RankHeader'

export default function RankHeaderSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <Suspense fallback={<RankHeaderSkeleton />}>
      <RankHeader rankPeriod={rankPeriod} />
    </Suspense>
  )
}
