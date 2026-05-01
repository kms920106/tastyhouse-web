import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankHeader from './RankHeader'
import { RankHeaderSkeleton } from './RankHeaderSkeleton'

export default function RankHeaderSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <Suspense fallback={<RankHeaderSkeleton />}>
      <RankHeader rankPeriod={rankPeriod} />
    </Suspense>
  )
}
