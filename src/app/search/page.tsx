import SearchPage from './_components/SearchPage'

interface Props {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams

  return <SearchPage query={q ?? ''} />
}
