import AppPrimaryButton from '@/components/ui/AppPrimaryButton'

interface PaymentActionBarProps {
  onPaymentClick: () => void
}

export default function PaymentActionBar({ onPaymentClick }: PaymentActionBarProps) {
  return (
    <div className="px-[15px] py-5">
      <AppPrimaryButton onClick={onPaymentClick}>
        결제하기
      </AppPrimaryButton>
    </div>
  )
}
