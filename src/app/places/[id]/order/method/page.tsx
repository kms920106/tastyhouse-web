import OrderMethodPage from './_components/OrderMethodPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const placeId = Number(id)

  return <OrderMethodPage placeId={placeId} />
}
