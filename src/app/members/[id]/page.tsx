import MemberProfileContent from './_components/MemberProfileContent'

interface Props {
  params: Promise<{ id: string }>
}

export default async function MemberProfilePage({ params }: Props) {
  const { id } = await params

  const memberId = Number(id)

  return <MemberProfileContent memberId={memberId} />
}
