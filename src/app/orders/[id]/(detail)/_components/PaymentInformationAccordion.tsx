import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { getPaymentMethodName } from '@/constants/payment'
import type { PaymentSummaryResponse } from '@/domains/order'
import { formatDate } from '@/lib/date'

interface PaymentInformationAccordionProps {
  payment: PaymentSummaryResponse
}

export default function PaymentInformationAccordion({
  payment,
}: PaymentInformationAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="payment-info">
      <AccordionItem value="payment-info" className="border-b-0">
        <AccordionTrigger className="items-center px-[15px] py-5 hover:no-underline">
          <h2 className="text-base leading-[16px]">결제 정보</h2>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="px-[15px] py-2.5 pb-5">
            <div className="space-y-[15px]">
              <div className="flex justify-between">
                <span className="text-sm leading-[14px]">결제시간</span>
                <span className="text-sm leading-[14px]">
                  {formatDate(payment.approvedAt, 'YYYY-MM-DD HH:mm')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm leading-[14px]">결제방법</span>
                <div className="flex flex-col items-end gap-1">
                  <p className="text-sm leading-[14px]">
                    {getPaymentMethodName(payment.paymentMethod)}
                  </p>
                  {payment.cardNumber && (
                    <p className="text-[11px] leading-[11px] text-[#aaaaaa]">
                      {payment.cardCompany}({payment.cardNumber})
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
