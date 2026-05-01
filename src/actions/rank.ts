'use server'

import { rankRepository } from '@/domains/rank/rank.repository'
import { revalidatePath } from 'next/cache'

export async function getRankDuration() {
  return rankRepository.getRankDuration()
}

export async function getRankPrizes() {
  return rankRepository.getRankPrizes()
}

export async function retryRankPage() {
  revalidatePath('/rank')
}
