import AccountInfoEditSection from './_components/AccountInfoEditSection'

interface AccountInfoEditPageProps {
  searchParams: Promise<{ verifyToken?: string }>
}

export default async function AccountInfoEditPage({ searchParams }: AccountInfoEditPageProps) {
  const { verifyToken = '' } = await searchParams

  return <AccountInfoEditSection verifyToken={verifyToken} />
}
