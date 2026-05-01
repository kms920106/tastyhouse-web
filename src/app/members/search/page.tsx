import MemberSearchSection from './_components/MemberSearchSection'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function MemberSearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const initialQuery = q ?? ''

  return <MemberSearchSection initialQuery={initialQuery} />
}
