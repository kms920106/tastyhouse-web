import PlaceOrderCartPage from './_components/PlaceOrderCartPage'

interface CartPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CartPage({ params }: CartPageProps) {
  const { id } = await params
  const placeId = Number(id)

  return <PlaceOrderCartPage placeId={placeId} />
}
