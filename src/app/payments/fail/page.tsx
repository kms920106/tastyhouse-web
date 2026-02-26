import PaymentFailContent from './_components/PaymentFailContent'

interface PaymentFailPageProps {
  searchParams: Promise<{ code?: string; message?: string }>
}

export default async function PaymentFailPage({ searchParams }: PaymentFailPageProps) {
  const { code, message } = await searchParams

  return <PaymentFailContent errorCode={code} errorMessage={message} />
}
