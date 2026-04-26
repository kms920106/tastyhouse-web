import PlaceOrderMenuDetailPage from './_components/PlaceOrderMenuDetailPage'

interface Props {
  params: Promise<{
    id: string
    menuId: string
  }>
}

export default async function Page({ params }: Props) {
  const { id, menuId } = await params

  const placeId = Number(id)
  const productId = Number(menuId)

  return <PlaceOrderMenuDetailPage placeId={placeId} productId={productId} />
}
