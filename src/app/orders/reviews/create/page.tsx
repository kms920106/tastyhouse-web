import OrderReviewCreatePage from './_components/OrderReviewCreatePage'

interface Props {
  searchParams: Promise<{
    orderItemId?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { orderItemId } = await searchParams

  return <OrderReviewCreatePage orderItemId={Number(orderItemId)} />
}
