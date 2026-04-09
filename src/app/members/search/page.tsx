import MemberSearchSection from './_components/MemberSearchSection'

interface MemberSearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function MemberSearchPage({ searchParams }: MemberSearchPageProps) {
  const { q } = await searchParams
  const initialQuery = q ?? ''

  return <MemberSearchSection initialQuery={initialQuery} />
}
