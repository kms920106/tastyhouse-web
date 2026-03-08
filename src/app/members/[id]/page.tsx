import MemberProfileContent from './_components/MemberProfileContent'

interface MemberProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params

  const memberId = Number(id)

  return <MemberProfileContent memberId={memberId} />
}
