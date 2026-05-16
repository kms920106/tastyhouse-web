import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import SearchResultPage from './_components/SearchResultPage'
import type { SearchTab } from '@/domains/search/search.dto'

interface Props {
  searchParams: Promise<{
    q?: string
    tab?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { q, tab: tabParam } = await searchParams

  if (!q?.trim()) {
    redirect(PAGE_PATHS.SEARCH)
  }

  const tab: SearchTab =
    tabParam === 'menu' || tabParam === 'review' || tabParam === 'place' ? tabParam : 'all'

  return <SearchResultPage query={q} tab={tab} />
}
