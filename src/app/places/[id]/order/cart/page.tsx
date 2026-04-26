import PlaceOrderCartPage from './_components/PlaceOrderCartPage'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const placeId = Number(id)

  return <PlaceOrderCartPage placeId={placeId} />
}
