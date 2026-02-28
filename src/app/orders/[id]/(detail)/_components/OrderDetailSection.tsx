import CancelOrderButton from '@/app/orders/[id]/(detail)/_components/CancelOrderButton'
import OrderStatusHeader from '@/app/orders/[id]/(detail)/_components/OrderStatusHeader'
import OrderedProductList from '@/app/orders/[id]/(detail)/_components/OrderedProductList'
import OrdererInformationAccordion from '@/app/orders/[id]/(detail)/_components/OrdererInformationAccordion'
import PaymentBreakdownAccordion from '@/app/orders/[id]/(detail)/_components/PaymentBreakdownAccordion'
import PaymentInformationAccordion from '@/app/orders/[id]/(detail)/_components/PaymentInformationAccordion'
import RefundPolicySection from '@/app/orders/[id]/(detail)/_components/RefundPolicySection'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import SectionStack from '@/components/ui/SectionStack'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getOrderDetail } from '@/services/order'

interface OrderDetailSectionProps {
  orderId: number
}

export default async function OrderDetailSection({ orderId }: OrderDetailSectionProps) {
  const { data } = await getOrderDetail(orderId)

  if (!data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문')} />
  }

  const {
    orderNumber,
    paymentStatus,
    placeName,
    placePhoneNumber,
    orderItems,
    ordererName,
    ordererPhone,
    ordererEmail,
    totalProductAmount,
    productDiscountAmount,
    couponDiscountAmount,
    pointDiscountAmount,
    totalDiscountAmount,
    finalAmount,
    payment,
  } = data

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>결제내역</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <OrderStatusHeader orderNumber={orderNumber} paymentStatus={paymentStatus} />
        </BorderedSection>
        <BorderedSection>
          <OrderedProductList orderId={orderId} placeName={placeName} orderItems={orderItems} />
        </BorderedSection>
        <BorderedSection>
          <OrdererInformationAccordion
            ordererName={ordererName}
            ordererPhone={ordererPhone}
            ordererEmail={ordererEmail}
          />
        </BorderedSection>
        <BorderedSection>
          <PaymentInformationAccordion payment={payment} />
        </BorderedSection>
        <BorderedSection>
          <PaymentBreakdownAccordion
            totalProductAmount={totalProductAmount}
            productDiscountAmount={productDiscountAmount}
            couponDiscountAmount={couponDiscountAmount}
            pointDiscountAmount={pointDiscountAmount}
            totalDiscountAmount={totalDiscountAmount}
            finalAmount={finalAmount}
          />
        </BorderedSection>
        <BorderedSection>
          <RefundPolicySection />
        </BorderedSection>
      </SectionStack>
      <CancelOrderButton
        paymentId={payment.id}
        paymentStatus={paymentStatus}
        phoneNumber={placePhoneNumber}
      />
    </section>
  )
}
