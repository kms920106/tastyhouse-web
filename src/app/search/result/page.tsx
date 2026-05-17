import type { SearchTab } from '@/domains/search/search.type'
import SearchResultPage from './_components/SearchResultPage'

interface Props {
  searchParams: Promise<{
    q?: string
    tab?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { q, tab } = await searchParams

  const initialTab = (tab || 'all') as SearchTab

  return <SearchResultPage query={q ?? ''} tab={initialTab} />
}
