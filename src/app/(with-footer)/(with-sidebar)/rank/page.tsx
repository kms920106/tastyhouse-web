import { RankPeriod } from '@/domains/rank'
import MyRankFixedSection from './_components/MyRankFixedSection'
import PrizeListSection from './_components/PrizeListSection'
import RankSection from './_components/RankSection'

const isValidRankType = (type: string | undefined): type is RankPeriod => {
  return type === 'all' || type === 'monthly'
}

export default async function RankPage({ searchParams }: { searchParams: { type?: string } }) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const typeParam = resolvedSearchParams.type

  const rankPeriod: RankPeriod = isValidRankType(typeParam) ? typeParam : 'all'

  return (
    <>
      <PrizeListSection />
      <RankSection rankPeriod={rankPeriod} />
      <MyRankFixedSection rankPeriod={rankPeriod} />
    </>
  )
}
