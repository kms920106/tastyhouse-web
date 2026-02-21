'use client'

import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import type { PaymentCancelCode, PaymentStatus } from '@/domains/payment'
import { cancelPayment } from '@/services/payment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CancelResultDialog from './CancelResultDialog'

interface CancelOrderButtonProps {
  paymentId: number
  paymentStatus: PaymentStatus
  phoneNumber: string
}

export default function CancelOrderButton({
  paymentId,
  paymentStatus,
  phoneNumber,
}: CancelOrderButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [cancelResultCode, setCancelResultCode] = useState<PaymentCancelCode | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleCancelClick = () => {
    if (paymentStatus === 'CANCELLED') {
      setCancelResultCode('ALREADY_CANCELLED')
      return
    }

    setShowCancelConfirm(true)
  }

  const handleCancelPayment = async () => {
    setShowCancelConfirm(false)

    setIsLoading(true)

    const response = await cancelPayment(paymentId, { cancelReason: '사용자 결제 취소 요청' })

    setIsLoading(false)

    if (response.error) {
      alert('결제 취소 중 오류가 발생했습니다.')
      return
    }

    const code = response.data?.data?.code
    if (code) {
      setCancelResultCode(code)
      if (code === 'SUCCESS') {
        router.refresh()
      }
    }
  }

  return (
    <>
      <div className="px-[15px] py-5">
        <AppSubmitButton
          onClick={handleCancelClick}
          isSubmitting={isLoading}
          loadingText="취소 중"
        >
          결제취소
        </AppSubmitButton>
      </div>
      <AppConfirmDialog
        open={showCancelConfirm}
        title="주문을 취소하시겠습니까?"
        description={`주문을 취소하시면 결제 금액은 전액 환불됩니다.\n취소 이후에는 다시 되돌릴 수 없습니다.`}
        onConfirm={handleCancelPayment}
        onCancel={() => setShowCancelConfirm(false)}
        cancelLabel="취소"
        confirmLabel="확인"
      />
      <CancelResultDialog
        cancelResultCode={cancelResultCode}
        phoneNumber={phoneNumber}
        onClose={() => setCancelResultCode(null)}
      />
    </>
  )
}
