import PlaceProductDetailPage from './_components/PlaceProductDetailPage'

interface Props {
  params: Promise<{ id: string; productId: string }>
}

export default async function Page({ params }: Props) {
  const { id, productId } = await params
  const placeId = Number(id)
  const productIdNum = Number(productId)

  return <PlaceProductDetailPage placeId={placeId} productId={productIdNum} />
}
