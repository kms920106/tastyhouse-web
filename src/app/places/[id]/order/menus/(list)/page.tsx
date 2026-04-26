import OrderMenuPage from './_components/OrderMenuPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const placeId = Number(id)

  return <OrderMenuPage placeId={placeId} />
}
