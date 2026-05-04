import { RankPeriod } from '@/domains/rank'
import RankPage from './_components/RankPage'

const isValidRankType = (type: string | undefined): type is RankPeriod => {
  return type === 'all' || type === 'monthly'
}

export default async function Page({ searchParams }: { searchParams: { type?: string } }) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const typeParam = resolvedSearchParams.type

  const rankPeriod: RankPeriod = isValidRankType(typeParam) ? typeParam : 'all'

  return <RankPage rankPeriod={rankPeriod} />
}
