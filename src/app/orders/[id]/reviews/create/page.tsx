import OrderReviewCreateSection from './_components/OrderReviewCreateSection'

interface OrderReviewCreatePageProps {
  searchParams: Promise<{
    productName?: string
    productImageUrl?: string
    productPrice?: string
  }>
}

export default async function OrderReviewCreatePage({ searchParams }: OrderReviewCreatePageProps) {
  const { productName = '', productImageUrl = '', productPrice = '0' } = await searchParams

  return (
    <OrderReviewCreateSection
      productName={productName}
      productImageUrl={productImageUrl}
      productPrice={Number(productPrice)}
    />
  )
}
