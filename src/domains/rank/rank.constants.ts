import type { RankPeriod, RankType } from './rank.types'

const RANK_PERIOD_TO_TYPE_MAP: Record<RankPeriod, RankType> = {
  all: 'ALL',
  monthly: 'MONTHLY',
}

export const rankPeriodToRankType = (period: RankPeriod): RankType => {
  return RANK_PERIOD_TO_TYPE_MAP[period]
}
