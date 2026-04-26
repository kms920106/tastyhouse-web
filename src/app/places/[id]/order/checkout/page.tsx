import PlaceOrderCheckoutPage from './_components/PlaceOrderCheckoutPage'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const placeId = Number(id)

  return <PlaceOrderCheckoutPage placeId={placeId} />
}
