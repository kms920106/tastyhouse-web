import MemberSearchPage from './_components/MemberSearchPage'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams
  const initialQuery = q ?? ''

  return <MemberSearchPage initialQuery={initialQuery} />
}
