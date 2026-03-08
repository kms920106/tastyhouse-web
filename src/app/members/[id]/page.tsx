import MemberProfileContent from './_components/MemberProfileContent'

interface MemberProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params

  return <MemberProfileContent memberId={id} />
}
