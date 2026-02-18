import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import CancelOrderButton from '@/components/order/CancelOrderButton'
import OrderStatusHeader from '@/components/order/OrderStatusHeader'
import OrderedProductList from '@/components/order/OrderedProductList'
import OrdererInformationAccordion from '@/components/order/OrdererInformationAccordion'
import PaymentBreakdownAccordion from '@/components/order/PaymentBreakdownAccordion'
import PaymentInformationAccordion from '@/components/order/PaymentInformationAccordion'
import RefundPolicySection from '@/components/order/RefundPolicySection'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import type { OrderDetailResponse } from '@/domains/order'

interface OrderCompleteSectionProps {
  orderDetail: OrderDetailResponse
}

export default function OrderCompleteSection({ orderDetail }: OrderCompleteSectionProps) {
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
  } = orderDetail

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
          <OrderedProductList placeName={placeName} orderItems={orderItems} />
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
